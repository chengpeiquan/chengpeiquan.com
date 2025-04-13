import { z } from 'zod'
import { locales } from './locale-config'

// Read markdown files from `@/content/fragment/tattoo-intro-vol-*.md`
export const tattooIntroSlugPrefix = 'tattoo-intro-vol-'

const tattooStoryMetadataSchema = z.object({
  title: z.string(),
})

export const tattooStorySchema = z.object({
  date: z.string(),
  metadata: z.record(z.enum(locales), tattooStoryMetadataSchema),
  images: z.array(z.string()),
})

export type TattooStory = z.infer<typeof tattooStorySchema>

export const tattooStories: TattooStory[] = [
  {
    date: '2016-10-15',
    metadata: {
      zh: {
        title: 'Bass',
      },
      en: {
        title: 'Bass',
      },
    },
    images: [
      'https://cdn.chengpeiquan.com/img/2025/04/202504062313542.JPG?x-oss-process=image/interlace,1',
      'https://cdn.chengpeiquan.com/img/2025/04/202504062313534.JPG?x-oss-process=image/interlace,1',
      'https://cdn.chengpeiquan.com/img/2025/04/202504062313535.JPG?x-oss-process=image/interlace,1',
      // 'https://cdn.chengpeiquan.com/img/2025/04/202504072328519.jpeg?x-oss-process=image/interlace,1',
    ],
  },
  {
    date: '2017-06-26',
    metadata: {
      zh: {
        title: '杀死沮丧',
      },
      en: {
        title: 'Kill Depression',
      },
    },
    images: [
      'https://cdn.chengpeiquan.com/img/2025/04/202504072331856.jpeg?x-oss-process=image/interlace,1',
      'https://cdn.chengpeiquan.com/img/2025/04/202504072331857.jpeg?x-oss-process=image/interlace,1',
    ],
  },
  {
    date: '2017-09-23',
    metadata: {
      zh: {
        title: '猫是我最好的朋友',
      },
      en: {
        title: 'Cats are my best friends',
      },
    },
    images: [
      'https://cdn.chengpeiquan.com/img/2025/04/202504072344650.JPG?x-oss-process=image/interlace,1',
      'https://cdn.chengpeiquan.com/img/2025/04/202504072344652.JPG?x-oss-process=image/interlace,1',
      // 'https://cdn.chengpeiquan.com/img/2025/04/202504072344653.JPG?x-oss-process=image/interlace,1',
      'https://cdn.chengpeiquan.com/img/2025/04/202504072354960.jpeg?x-oss-process=image/interlace,1',
      'https://cdn.chengpeiquan.com/img/2025/04/202504080009862.jpeg?x-oss-process=image/interlace,1',
      'https://cdn.chengpeiquan.com/img/2025/04/202504080009863.jpeg?x-oss-process=image/interlace,1',
      'https://cdn.chengpeiquan.com/img/2025/04/202504080017041.jpeg?x-oss-process=image/interlace,1',
    ],
  },
  {
    date: '2017-12-20',
    metadata: {
      zh: {
        title: '内心的回响',
      },
      en: {
        title: 'Echoes from Within',
      },
    },
    images: [
      'https://cdn.chengpeiquan.com/img/2025/04/202504080039710.jpeg?x-oss-process=image/interlace,1',
      'https://cdn.chengpeiquan.com/img/2025/04/202504080039711.jpeg?x-oss-process=image/interlace,1',
      'https://cdn.chengpeiquan.com/img/2025/04/202504080039712.jpeg?x-oss-process=image/interlace,1',
    ],
  },
  {
    date: '2018-08-03',
    metadata: {
      zh: {
        title: '坚如磐石',
      },
      en: {
        title: 'Solid as a rock',
      },
    },
    images: [
      'https://cdn.chengpeiquan.com/img/2025/04/202504080053286.jpeg?x-oss-process=image/interlace,1',
      'https://cdn.chengpeiquan.com/img/2025/04/202504080053288.jpeg?x-oss-process=image/interlace,1',
    ],
  },
  {
    date: '2019-01-07',
    metadata: {
      zh: {
        title: '鲤影藏金',
      },
      en: {
        title: 'A Carp Cradling Fortune',
      },
    },
    images: [
      'https://cdn.chengpeiquan.com/img/2025/04/202504082348819.jpeg?x-oss-process=image/interlace,1',
      'https://cdn.chengpeiquan.com/img/2025/04/202504082348818.jpeg?x-oss-process=image/interlace,1',
    ],
  },
  {
    date: '2019-05-22',
    metadata: {
      zh: {
        title: '三阳开泰',
      },
      en: {
        title: 'Sanyang Kaitai',
      },
    },
    images: [
      'https://cdn.chengpeiquan.com/img/2025/04/202504090057721.JPG?x-oss-process=image/interlace,1',
      'https://cdn.chengpeiquan.com/img/2025/04/202504090057722.JPG?x-oss-process=image/interlace,1',
      'https://cdn.chengpeiquan.com/img/2025/04/202504090057723.JPG?x-oss-process=image/interlace,1',
    ],
  },
  {
    date: '2020-06-02',
    metadata: {
      zh: {
        title: '临渊羡鱼，不如退而结网',
      },
      en: {
        title: 'Less Wish, More Work',
      },
    },
    images: [
      'https://cdn.chengpeiquan.com/img/2025/04/202504090138300.JPG?x-oss-process=image/interlace,1',
      'https://cdn.chengpeiquan.com/img/2025/04/202504090138301.JPG?x-oss-process=image/interlace,1',
      'https://cdn.chengpeiquan.com/img/2025/04/202504090138302.JPG?x-oss-process=image/interlace,1',
    ],
  },
]

export const tattooImages = tattooStories.flatMap((story) => story.images)
