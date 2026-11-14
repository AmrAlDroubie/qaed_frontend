import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import GradingPage from '../pages/shared/GradingPage.vue'
import GradingAssignmentDialog from '../components/grading/GradingAssignmentDialog.vue'
import { gradingSubmissions } from '../data/grading'

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', '') }
  HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); this.dispatchEvent(new Event('close')) }
})

describe('grading flow', () => {
  it('updates scores, validates bounds, and applies the AI override', async () => {
    const wrapper = mount(GradingAssignmentDialog, { props: { submission: { ...gradingSubmissions[0]!, aiDeduction: 25, aiLevel: 3 } } })
    expect(wrapper.text()).toContain('4.13')
    await wrapper.get('#manual-score').setValue('1')
    expect(wrapper.text()).toContain('3.00')
    await wrapper.get('[role="switch"]').setValue(true)
    expect(wrapper.text()).toContain('4.00')
    await wrapper.get('#manual-score').setValue('4')
    expect(wrapper.findAll('button').find(button => button.text().includes('حفظ'))!.attributes('disabled')).toBeDefined()
    wrapper.unmount()
  })

  it('saves, advances, and closes the next popup without a stale close flag', async () => {
    const wrapper = mount(GradingPage, { global: { plugins: [createPinia()] } })
    await wrapper.findAll('button').find(button => button.text().includes('تصحيح الآن'))!.trigger('click')
    await wrapper.get('#grader-notes').setValue('تقييم تجريبي')
    await wrapper.findAll('button').find(button => button.text().includes('حفظ وتمرير'))!.trigger('click')
    expect(wrapper.findComponent(GradingAssignmentDialog).props('submission').id).toBe('journal-2')
    expect(wrapper.findAll('tbody tr').filter(row => row.text().includes('بانتظار التقييم'))).toHaveLength(1)
    await wrapper.get('[aria-label="إغلاق"]').trigger('click')
    expect(wrapper.find('dialog').exists()).toBe(false)
    expect(gradingSubmissions[0]!.status).toBe('pending')
    wrapper.unmount()
  })
})
