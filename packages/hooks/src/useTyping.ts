import { delay } from '@shell-box/utils';
import { useCallback, useEffect, useState } from 'react';

interface TypingHookProps {
  content: string;
  startDelay?: number;
}

function useTyping({ content, startDelay = 0 }: TypingHookProps) {
  const [text, setText] = useState<string>('');
  const [isTypingEnd, setIsTypingEnd] = useState<boolean>(true);

  const addText = useCallback(
    (text: string) => `${text.slice(0, text.length - 1) + content[text.length - 1]}|`,
    [content],
  );

  useEffect(() => {
    if (isTypingEnd) return;
    (async () => {
      await delay(70);
      if (text.length === content.length + 1) return setIsTypingEnd(true);
      return setText((text) => addText(text));
    })();
  }, [content, text, isTypingEnd, addText]);

  useEffect(() => {
    (async () => {
      await delay(startDelay);
      setIsTypingEnd(false);
      setText('|');
    })();
  }, [content, startDelay]);

  return { text, isTypingEnd };
}

export default useTyping;
