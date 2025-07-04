export const Enums = [
    "not_issued",
    "issued",
    "drafts",
    "templates",
    "nd40",
] as const;

export type Status = typeof Enums[number];


export const WORKFLOW_STATUSES = ['working','draft','template'] as const;
export type WorkflowStatus = typeof WORKFLOW_STATUSES[number];

export const SUBMISSION_TYPES = [
    'new',
    'reregistration',
    'reissue',
    'reissue_vd_nd_pd',
] as const;

export type SubmissionType = typeof SUBMISSION_TYPES[number];

// map each value to its Russian label
export const SUBMISSION_TYPE_LABELS: Record<SubmissionType, string> = {
    new:                'Новая',
    reregistration:     'Перерегистрация',
    reissue:            'Переоформление',
    reissue_vd_nd_pd:   'Переоформление ВД/НД/ПД',
};

export const DECLARATION_TYPES = ['export','reexport','import'] as const;
export type DeclarationType = typeof DECLARATION_TYPES[number];