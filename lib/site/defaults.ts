import type { HomePageContent, ReferenceMap, ReferenceRecord, SiteSettings } from './types';

export const DEFAULT_SITE_SETTINGS_ID = '00000000-0000-0000-0000-000000000001';

export const defaultSiteSettings: SiteSettings = {
  id: DEFAULT_SITE_SETTINGS_ID,
  site_title: 'Positioning and the Effect on Labor',
  short_title: 'Positioning & Labor',
  mobile_title: 'Positioning & Labor',
  tagline: 'Evidence-informed birth education',
  monogram: 'PL',
  footer_title: 'Positioning and the Effect on Labor',
  footer_subtitle: 'Evidence-informed birth education',
  seo_title: 'Positioning and the Effect on Labor',
  seo_description:
    'An evidence-based educational website about maternal positioning during labor, birth options, and why movement matters.',
};

export const defaultReferences: ReferenceRecord[] = [
  {
    ref_key: 'ondeck2019',
    short_label: 'Ondeck (2019)',
    full_citation:
      'Ondeck, M. (2019, April 1). Healthy Birth Practice #2: Walk, move around, and change positions throughout labor. The Journal of Perinatal Education.',
    source_url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6503896/',
    doi: null,
    sort_order: 1,
    is_active: true,
  },
  {
    ref_key: 'zang2020',
    short_label: 'Zang et al. (2020)',
    full_citation:
      'Zang, Y., Lu, H., Zhang, H., Huang, J., Ren, L., & Li, C. (2020). Effects of upright positions during the second stage of labour for women without epidural analgesia: A meta-analysis. Journal of Advanced Nursing, 76, 3293–3306.',
    source_url: 'https://doi.org/10.1111/jan.14587',
    doi: '10.1111/jan.14587',
    sort_order: 2,
    is_active: true,
  },
  {
    ref_key: 'liu2025',
    short_label: 'Liu et al. (2025)',
    full_citation:
      "Liu, H., Li, L., Wang, X., Zhu, X., Sun, L., Zhu, C., Min, H., & Gu, C. (2025). Effectiveness of nulliparous women's different childbirth positions during the second stage of labor: A systematic review and network meta-analysis. International Journal of Nursing Sciences, 12(3), 268–275.",
    source_url: 'https://doi.org/10.1016/j.ijnss.2025.04.006',
    doi: '10.1016/j.ijnss.2025.04.006',
    sort_order: 3,
    is_active: true,
  },
  {
    ref_key: 'satone2023',
    short_label: 'Satone et al. (2023)',
    full_citation:
      'Satone, P. D., Tayade, S. A., & Tayade, S. (2023). Alternative birthing positions compared to the conventional position in the second stage of labor: A review. Cureus, 15(4).',
    source_url: null,
    doi: null,
    sort_order: 4,
    is_active: true,
  },
  {
    ref_key: 'gimovsky2022',
    short_label: 'Gimovsky & Berghella (2022)',
    full_citation:
      'Gimovsky, A. C., & Berghella, V. (2022). Evidence-based labor management: second stage of labor (part 4). American Journal of Obstetrics & Gynecology MFM, 4(2), 100548.',
    source_url: null,
    doi: null,
    sort_order: 5,
    is_active: true,
  },
];

export const defaultReferenceMap: ReferenceMap = Object.fromEntries(
  defaultReferences.map((reference, index) => [
    reference.ref_key,
    {
      number: index + 1,
      label: reference.short_label,
      citation: reference.full_citation,
      sourceUrl: reference.source_url,
      doi: reference.doi,
    },
  ])
);

export const defaultHomePageContent: HomePageContent = {
  hero: {
    eyebrow: 'Evidence-informed birth education',
    subline: 'Maternal positioning, mobility, and delivery outcomes',
    title: 'Positioning and the Effect on Labor',
    lead:
      'Positioning during labor is not just a comfort preference. The literature selected for this project consistently points to the value of walking, changing positions, and using upright or non-supine options when clinically appropriate.',
    primaryCta: {
      label: 'Explore the evidence',
      href: '/move-through-labor/evidence',
    },
    secondaryCta: {
      label: 'Compare labor positions',
      href: '/move-through-labor/positions',
    },
  },
  heroCards: [
    {
      label: 'Mobility',
      title: 'Mobility',
      text: 'Walking, changing positions, and laboring upright are presented as meaningful supportive-care practices.',
      citations: ['ondeck2019', 'gimovsky2022'],
    },
    {
      label: 'Mechanics',
      title: 'Mechanics',
      text: 'Upright positions are associated in the selected evidence with fetal descent, pelvic opening, and more efficient labor mechanics.',
      citations: ['zang2020', 'liu2025', 'satone2023'],
    },
    {
      label: 'Choice',
      title: 'Choice',
      text: 'The point is not one mandatory posture. The point is informed, supported choice rather than default lithotomy.',
      citations: ['satone2023', 'gimovsky2022'],
    },
  ],
  heroSidebar: {
    eyebrow: 'Why this matters',
    title: 'A clearer first impression for readers',
    bullets: [
      {
        text: 'Alternative positions may support physiologic labor progression, fetal descent, and more efficient pushing mechanics.',
        citations: ['zang2020', 'liu2025', 'satone2023'],
      },
      {
        text: 'Selected reviews describe drawbacks of routine supine or lithotomy positioning, including greater discomfort and higher risk of episiotomy or perineal injury in some comparisons.',
        citations: ['satone2023'],
      },
      {
        text: 'Walking, moving around, and changing positions throughout labor are presented as a healthy birth practice.',
        citations: ['ondeck2019'],
      },
    ],
  },
  featuredReferenceKeys: ['ondeck2019', 'zang2020', 'liu2025', 'satone2023', 'gimovsky2022'],
  overview: {
    eyebrow: 'Overview',
    title: 'Positioning can influence labor experience and delivery outcomes',
    description:
      'This educational site translates the selected research into clear, public-facing language. The goal is not to prescribe one universal position, but to show that birthing people should know they have options.',
    cards: [
      {
        eyebrow: 'Context',
        title: 'Historical routine vs. current evidence',
        text: 'Hospitals have often encouraged supine or recumbent positioning for monitoring and clinician convenience. The selected literature argues that upright, kneeling, squatting, sitting, walking, or otherwise mobile positions can better support physiologic labor.',
        citations: ['ondeck2019', 'satone2023', 'liu2025'],
      },
      {
        eyebrow: 'First births',
        title: 'Important for nulliparous women',
        text: 'The project focuses in part on women giving birth for the first time, who often experience longer labor. The selected reviews examine whether second-stage positions can improve outcomes and reduce the need for more intervention-heavy delivery.',
        citations: ['liu2025', 'gimovsky2022'],
      },
      {
        eyebrow: 'Systems view',
        title: 'Why cost and resource use matter',
        text: 'Promoting mobility and position choice is a comparatively low-cost supportive-care strategy. Ondeck’s discussion of movement during labor supports the argument that avoiding unnecessary intervention has both clinical and operational value.',
        citations: ['ondeck2019'],
      },
    ],
  },
  takeaways: {
    eyebrow: 'Key takeaways',
    title: 'What this website argues',
    description:
      'The position a woman uses in labor can affect comfort, mechanics, and the overall birth process.',
    cards: [
      {
        title: 'Mobility should be supported.',
        text: 'Laboring women benefit from being encouraged to move, walk, sway, kneel, sit, squat, or rest in non-supine positions when it is safe to do so.',
        citations: ['ondeck2019', 'gimovsky2022'],
      },
      {
        title: 'Lithotomy should not be treated as the automatic default.',
        text: 'The selected reviews suggest the conventional supine or lithotomy approach may come with tradeoffs, especially when compared with positions that use gravity and increase pelvic space.',
        citations: ['satone2023', 'zang2020'],
      },
      {
        title: 'Patient choice is part of quality care.',
        text: 'Evidence-based labor management includes respecting maternal preferences and recognizing that more than one position may be appropriate during the second stage of labor.',
        citations: ['gimovsky2022', 'liu2025'],
      },
    ],
  },
  audienceBox: {
    eyebrow: 'Who this is for',
    title: 'General public first, citations still visible',
    body1:
      'This site is written for the general public, but it keeps citations visible so that readers can trace each major point back to the selected articles.',
    body2:
      'It can also serve as a discussion starter for childbirth education, shared decision-making, and conversations with clinicians about labor mobility.',
    cta: {
      label: 'See full references',
      href: '/move-through-labor/resources',
    },
  },
};
