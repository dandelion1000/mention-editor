let emojilist = {
  'grimacing': {
    'keywords': ['face', 'grimace', 'teeth'],
    'char': '😬',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'grin': {
    'keywords': ['face', 'happy', 'smile', 'joy', 'kawaii'],
    'char': '😁',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'joy': {
    'keywords': ['face', 'cry', 'tears', 'weep', 'happy', 'happytears', 'haha'],
    'char': '😂',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'rofl': {
    'keywords': ['face', 'rolling', 'floor', 'laughing', 'lol', 'haha'],
    'char': '🤣',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'smiley': {
    'keywords': ['face', 'happy', 'joy', 'haha', ':D', ':)', 'smile', 'funny'],
    'char': '😃',
    'fitzpatrick_scale': false,
    'category': 'people'
  },

  'wink': {
    'keywords': ['face', 'happy', 'mischievous', 'secret', ';)', 'smile', 'eye'],
    'char': '😉',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'blush': {
    'keywords': ['face', 'smile', 'happy', 'flushed', 'crush', 'embarrassed', 'shy', 'joy'],
    'char': '😊',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'yum': {
    'keywords': ['happy', 'joy', 'tongue', 'smile', 'face', 'silly', 'yummy', 'nom', 'delicious', 'savouring'],
    'char': '😋',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'relieved': {
    'keywords': ['face', 'relaxed', 'phew', 'massage', 'happiness'],
    'char': '😌',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'heart_eyes': {
    'keywords': ['face', 'love', 'like', 'affection', 'valentines', 'infatuation', 'crush', 'heart'],
    'char': '😍',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'kissing_heart': {
    'keywords': ['face', 'love', 'like', 'affection', 'valentines', 'infatuation', 'kiss'],
    'char': '😘',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'kissing_closed_eyes': {
    'keywords': ['face', 'love', 'like', 'affection', 'valentines', 'infatuation', 'kiss'],
    'char': '😚',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'stuck_out_tongue_winking_eye': {
    'keywords': ['face', 'prank', 'childish', 'playful', 'mischievous', 'smile', 'wink', 'tongue'],
    'char': '😜',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'stuck_out_tongue_closed_eyes': {
    'keywords': ['face', 'prank', 'playful', 'mischievous', 'smile', 'tongue'],
    'char': '😝',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'sunglasses': {
    'keywords': ['face', 'cool', 'smile', 'summer', 'beach', 'sunglass'],
    'char': '😎',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'hugs': {
    'keywords': ['face', 'smile', 'hug'],
    'char': '🤗',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'smirk': {
    'keywords': ['face', 'smile', 'mean', 'prank', 'smug', 'sarcasm'],
    'char': '😏',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'unamused': {
    'keywords': ['indifference', 'bored', 'straight face', 'serious', 'sarcasm', 'unimpressed', 'skeptical', 'dubious', 'side_eye'],
    'char': '😒',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'roll_eyes': {
    'keywords': ['face', 'eyeroll', 'frustrated'],
    'char': '🙄',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'flushed': {
    'keywords': ['face', 'blush', 'shy', 'flattered'],
    'char': '😳',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'angry': {
    'keywords': ['mad', 'face', 'annoyed', 'frustrated'],
    'char': '😠',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'rage': {
    'keywords': ['angry', 'mad', 'hate', 'despise'],
    'char': '😡',
    'fitzpatrick_scale': false,
    'category': 'people'
  },

  'scream': {
    'keywords': ['face', 'munch', 'scared', 'omg'],
    'char': '😱',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'sob': {
    'keywords': ['face', 'cry', 'tears', 'sad', 'upset', 'depressed'],
    'char': '😭',
    'fitzpatrick_scale': false,
    'category': 'people'
  },

  'mask': {
    'keywords': ['face', 'sick', 'ill', 'disease'],
    'char': '😷',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'zzz': {
    'keywords': ['sleepy', 'tired', 'dream'],
    'char': '💤',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  'ghost': {
    'keywords': ['halloween', 'spooky', 'scary'],
    'char': '👻',
    'fitzpatrick_scale': false,
    'category': 'people'
  },
  '+1': {
    'keywords': ['thumbsup', 'yes', 'awesome', 'good', 'agree', 'accept', 'cool', 'hand', 'like'],
    'char': '👍',
    'fitzpatrick_scale': true,
    'category': 'people'
  },
  '-1': {
    'keywords': ['thumbsdown', 'no', 'dislike', 'hand'],
    'char': '👎',
    'fitzpatrick_scale': true,
    'category': 'people'
  },
  'muscle': {
    'keywords': ['arm', 'flex', 'hand', 'summer', 'strong', 'biceps'],
    'char': '💪',
    'fitzpatrick_scale': true,
    'category': 'people'
  },
  'pray': {
    'keywords': ['please', 'hope', 'wish', 'namaste', 'highfive'],
    'char': '🙏',
    'fitzpatrick_scale': true,
    'category': 'people'
  },
  'handshake': {
    'keywords': ['agreement', 'shake'],
    'char': '🤝',
    'fitzpatrick_scale': false,
    'category': 'people'
  },

  'beetle': {
    'keywords': ['animal', 'insect', 'nature', 'ladybug'],
    'char': '🐞',
    'fitzpatrick_scale': false,
    'category': 'animals_and_nature'
  },

  'rose': {
    'keywords': ['flowers', 'valentines', 'love', 'spring'],
    'char': '🌹',
    'fitzpatrick_scale': false,
    'category': 'animals_and_nature'
  },
  'wilted_flower': {
    'keywords': ['plant', 'nature', 'flower'],
    'char': '🥀',
    'fitzpatrick_scale': false,
    'category': 'animals_and_nature'
  },

  '100': {
    'keywords': ['score', 'perfect', 'numbers', 'century', 'exam', 'quiz', 'test', 'pass', 'hundred'],
    'char': '💯',
    'fitzpatrick_scale': false,
    'category': 'symbols'
  },


};
export default emojilist;