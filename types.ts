
export type Message = {
  role: 'user' | 'model';
  text: string;
};

export type Screen = 'intro' | 'chat';
