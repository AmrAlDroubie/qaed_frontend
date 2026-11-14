import { createRouter, createWebHistory } from 'vue-router'
import { upcomingAdminPages } from '../data/adminNavigation'
import { participantSections } from '../data/participant'
import { publicProfiles } from '../data/publicProfiles'
import { optionalAssignments } from '../data/optionalAssignments'
import { requiredAssignments } from '../data/assignments'
import { leadershipSessions } from '../data/leadershipRecord'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/demo', name: 'demo', component: () => import('../pages/DemoPage.vue'), meta: { title: 'العرض التجريبي | برنامج قائد' } },
    { path: '/complete-info', name: 'complete-info', component: () => import('../pages/CompleteInfoPage.vue'), meta: { title: 'أكمل بياناتك | برنامج قائد' } },
    {
      path: '/public-profile',
      component: () => import('../layouts/WorkspaceLayout.vue'),
      children: [
        { path: '', redirect: '/public-profile/faisal' },
        { path: ':id', name: 'public-profile', component: () => import('../pages/shared/PublicProfilePage.vue'), meta: { title: 'الملف العام | برنامج قائد' } },
      ],
    },
    {
      path: '/assignments',
      component: () => import('../layouts/WorkspaceLayout.vue'),
      meta: { allowedRoles: ['admin', 'supervisor'], homePath: '/assignments' },
      children: [
        { path: '', name: 'assignments-index', component: () => import('../pages/shared/AssignmentsIndexPage.vue'), meta: { title: 'إضافة تكليف والجدولة | برنامج قائد' } },
        { path: 'create', name: 'assignments-create', component: () => import('../pages/shared/CreateAssignmentPage.vue'), meta: { title: 'بناء وإضافة التكليف | برنامج قائد' } },
      ],
    },
    {
      path: '/grading',
      component: () => import('../layouts/WorkspaceLayout.vue'),
      meta: { allowedRoles: ['admin', 'supervisor'] },
      children: [{ path: '', name: 'grading', component: () => import('../pages/shared/GradingPage.vue'), meta: { title: 'اللوحة الموحدة للتصحيح | برنامج قائد' } }],
    },
    { path: '/supervisor/grading', redirect: '/grading' },
    { path: '/supervisor/assignments', redirect: '/assignments' },
    { path: '/login', name: 'login', component: () => import('../pages/LoginPage.vue') },
    {
      path: '/roster',
      component: () => import('../layouts/WorkspaceLayout.vue'),
      children: [
        { path: '', name: 'roster', component: () => import('../pages/shared/RosterPage.vue'), meta: { title: 'الروستر | برنامج قائد', roster: true } },
      ],
    },
    {
      path: '/admin',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [
        { path: '', name: 'admin-home', component: () => import('../pages/admin/AdminHomePage.vue'), meta: { title: 'إدارة الحسابات | برنامج قائد', programSection: 'accounts' } },
        { path: 'weeks', name: 'admin-weeks', component: () => import('../pages/admin/WeeksPage.vue'), meta: { title: 'إدارة الأسابيع | برنامج قائد', programSection: 'weeks' } },
        { path: 'participants', redirect: '/roster' },
        { path: 'assignments', redirect: '/assignments' },
        { path: 'grading', redirect: '/grading' },
        { path: 'launch', name: 'admin-launch', component: () => import('../pages/admin/BatchesPage.vue'), meta: { title: 'دورة حياة وإطلاق الدفعات | برنامج قائد', programSection: 'launch' } },
        ...upcomingAdminPages.filter(page => !['participants', 'launch', 'assignments', 'grading'].includes(page.path)).map(page => ({
          path: page.path,
          name: `admin-${page.path}`,
          component: () => import('../pages/ComingSoonPage.vue'),
          meta: { title: `${page.title} | قريبًا`, pageTitle: page.title, programSection: page.programSection, comingSoon: true },
        })),
        { path: ':pathMatch(.*)*', component: () => import('../pages/ComingSoonPage.vue'), meta: { title: 'قريبًا | برنامج قائد', comingSoon: true } },
      ],
    },
    ...(['supervisor', 'participant'] as const).map(role => ({
      path: `/${role}`,
      component: () => import('../layouts/WorkspaceLayout.vue'),
      props: { role },
      meta: { role, homePath: role === 'participant' ? '/participant' : '/roster' },
      children: [
        ...(role === 'participant' ? [
          { path: '', name: 'participant-home', component: () => import('../pages/participant/ParticipantHomePage.vue'), meta: { title: 'اللوحة الرئيسية | برنامج قائد' } },
          { path: 'weeks/:week', name: 'participant-meeting', component: () => import('../pages/participant/MeetingPage.vue'), meta: { title: 'اللقاء الأسبوعي | برنامج قائد' } },
          { path: 'leadership-log/:id', name: 'participant-leadership-detail', component: () => import('../pages/participant/LeadershipRecordDetailPage.vue'), meta: { title: 'تسليم السجل القيادي | برنامج قائد', hideSidebar: true } },
          { path: 'leadership-log', name: 'participant-leadership-log', component: () => import('../pages/participant/LeadershipRecordPage.vue'), meta: { title: 'السجل القيادي | برنامج قائد' } },
          { path: 'optional-assignments/:id', name: 'participant-optional-detail', component: () => import('../pages/participant/AssignmentDetailPage.vue'), meta: { title: 'التكليف الاختياري | برنامج قائد', hideSidebar: true } },
          { path: 'optional-assignments', name: 'participant-optional-assignments', component: () => import('../pages/participant/OptionalAssignmentsPage.vue'), meta: { title: 'التكاليف الاختيارية | برنامج قائد' } },
          { path: 'required-assignments/:id', name: 'participant-required-detail', component: () => import('../pages/participant/AssignmentDetailPage.vue'), meta: { title: 'اختبار التكليف | برنامج قائد', hideSidebar: true } },
          { path: 'required-assignments', name: 'participant-required-assignments', component: () => import('../pages/participant/RequiredAssignmentsPage.vue'), meta: { title: 'التكاليف الإلزامية | برنامج قائد' } },
          { path: 'attendance', name: 'participant-attendance', component: () => import('../pages/participant/AttendancePage.vue'), meta: { title: 'اللقاءات والحضور | برنامج قائد' } },
          ...[...participantSections.filter(page => !['attendance', 'required-assignments', 'optional-assignments', 'leadership-log'].includes(page.path)), { path: 'about', title: 'عن الجمعية' }, { path: 'profile', title: 'الملف الشخصي' }].map(page => ({
            path: page.path, component: () => import('../pages/ComingSoonPage.vue'), meta: { title: `${page.title} | قريبًا`, pageTitle: page.title, comingSoon: true },
          })),
        ] : [{ path: '', redirect: '/roster' }]),
        { path: 'roster', redirect: '/roster' },
        { path: ':pathMatch(.*)*', component: () => import('../pages/ComingSoonPage.vue'), meta: { title: 'قريبًا | برنامج قائد', comingSoon: true } },
      ],
    })),
    { path: '/:pathMatch(.*)*', component: () => import('../pages/ComingSoonPage.vue'), meta: { title: 'قريبًا | برنامج قائد', comingSoon: true } },
  ],
})

router.beforeEach(to => {
  if (to.name === 'participant-optional-detail' && !optionalAssignments.some(item => item.id === to.params.id)) return '/participant/optional-assignments'
  if (to.name === 'participant-required-detail' && !requiredAssignments.some(item => item.id === to.params.id)) return '/participant/required-assignments'
  if (to.name === 'participant-leadership-detail' && !leadershipSessions.some(session => session.id === to.params.id)) return '/participant/leadership-log'
  if (to.name === 'public-profile' && !publicProfiles.some(profile => profile.id === to.params.id)) return '/roster'
})

router.afterEach(to => {
  document.title = typeof to.meta.title === 'string' ? to.meta.title : 'تسجيل الدخول | برنامج قائد'
})

export default router
