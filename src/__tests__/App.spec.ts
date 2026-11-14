import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import LoginPage from '../pages/LoginPage.vue'
import LoginForm from '../components/auth/LoginForm.vue'

describe('Login page', () => {
  it('renders the Arabic login screen', () => {
    const wrapper = mount(LoginPage)
    expect(wrapper.find('main').attributes('dir')).toBe('rtl')
    expect(wrapper.find('h1').text()).toBe('أهلاً بك من جديد')
    expect(wrapper.findAll('input')).toHaveLength(3)
  })

  it('toggles passwords independently without submitting', async () => {
    const wrapper = mount(LoginForm)
    expect(wrapper.get('button[aria-controls="password"]').find('.lucide-eye-off').exists()).toBe(true)
    await wrapper.get('button[aria-controls="password"]').trigger('click')
    expect(wrapper.get('#password').attributes('type')).toBe('text')
    expect(wrapper.get('button[aria-controls="password"]').find('.lucide-eye').exists()).toBe(true)
    expect(wrapper.get('#confirmation').attributes('type')).toBe('password')
    await wrapper.get('button[aria-controls="password"]').trigger('click')
    expect(wrapper.get('#password').attributes('type')).toBe('password')
    expect(wrapper.get('button[aria-controls="password"]').find('.lucide-eye-off').exists()).toBe(true)
    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('rejects invalid identifiers and mismatched passwords, then emits valid credentials', async () => {
    const wrapper = mount(LoginForm)
    await wrapper.get('#identifier').setValue('invalid')
    await wrapper.get('#password').setValue('test-password')
    await wrapper.get('#confirmation').setValue('different')
    await wrapper.get('form').trigger('submit')
    expect(wrapper.get('#identifier').attributes('aria-invalid')).toBe('true')
    expect(wrapper.get('#confirmation').attributes('aria-invalid')).toBe('true')
    expect(wrapper.emitted('submit')).toBeUndefined()
    await wrapper.get('#identifier').setValue('person@example.com')
    await wrapper.get('#confirmation').setValue('test-password')
    await wrapper.get('form').trigger('submit')
    expect(wrapper.emitted('submit')).toEqual([[{ identifier: 'person@example.com', password: 'test-password' }]])
  })
})
