import { CloseButton } from "../CloseButton";
import bugImg from '../../assets/bug.svg'
import ideaImg from '../../assets/ideia.svg'
import thoughtImg from '../../assets/thought.svg'
import { useState } from 'react';

const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      src: bugImg,
      alt: 'Imagem de um inseto representando um erro no sistema.',
    },
  },
  IDEA: {
    title: 'Ideia',
    image: {
      src: ideaImg,
      alt: 'Imagem de uma lampada.',
    },
  },
  OTHER: {
    title: 'Outro',
    image: {
      src: thoughtImg,
      alt: 'Imagem de um balão de pensamento.',
    },
  },
}

type FeedbackType = keyof typeof feedbackTypes;

export function WidgetButton() {

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)


  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      <header className="text-xl leading-6">
        <span>Deixe seu feedback</span>
        <CloseButton />
      </header>
      {
        !feedbackType ? (
          <div className="flex py-8 gap-2 w-full">
            {
              Object.entries(feedbackTypes).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setFeedbackType(key as FeedbackType)}
                  className="bg-zinc-800 rounded-lg py-5 w-24 flex flex-1 flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
                >
                  <img src={value.image.src} alt={value.image.alt} />
                  <span>{value.title}</span>
                </button>
              ))
            }

          </div>
        ) : (
          <div>

          </div>
        )
      }
      <footer className="text-xs text-neutral-400">
        Feito com ❤ por <a href="https://www.rocketseat.com.br/" className="underline underline-offset-2" target="_blank" >Rocketseat</a>  e Zadraki
      </footer>
    </div>
  )
}