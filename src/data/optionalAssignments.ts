export interface OptionalAssignment {
  id: string
  title: string
  category: string
  difficulty: string
  weight: number
  status: 'pending' | 'review'
}

export const optionalAssignments: OptionalAssignment[] = [
  ...[1, 2, 3].map(number => ({ id: `course-${number}`, title: 'دورة تدريبية مع شهادة', category: 'دورة', difficulty: 'مرتفع', weight: 20, status: 'pending' as const })),
  { id: 'initiative', title: 'مبادرة تطوعية مصغرة', category: 'مبادرة', difficulty: 'مرتفع', weight: 20, status: 'pending' },
  { id: 'podcast', title: 'تلخيص بودكاست قيادي', category: 'استماع', difficulty: 'سهل', weight: 20, status: 'pending' },
  { id: 'productivity', title: 'تجربة أداة إنتاجية', category: 'تطبيق', difficulty: 'سهل', weight: 20, status: 'pending' },
  { id: 'interview', title: 'مقابلة مع قائد', category: 'مقابلة', difficulty: 'متوسط', weight: 20, status: 'review' },
  { id: 'article', title: 'مراجعة مقال قيادي', category: 'كتابة', difficulty: 'سهل', weight: 20, status: 'pending' },
  { id: 'presentation', title: 'ورشة تقديم وعرض', category: 'مهارة', difficulty: 'متوسط', weight: 20, status: 'pending' },
]
