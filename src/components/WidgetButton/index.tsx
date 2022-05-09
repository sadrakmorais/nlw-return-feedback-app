import { CloseButton } from "../CloseButton";
import bugImg from '../../assets/bug.svg'
import ideaImg from '../../assets/ideia.svg'
import thoughtImg from '../../assets/thought.svg'
import { useState } from 'react';
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
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

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetButton() {

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  const handleRestartFeedback = () => {
    setFeedbackSent(false)
    setFeedbackType(null)
  }


  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

      {
        feedbackSent ? (
          <FeedbackSuccessStep
            onFeedbackRestartRequest={handleRestartFeedback}
          />
        ) : (
          <>
            {
              !feedbackType ? (
                <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
              ) : (
                <FeedbackContentStep
                  feedbackType={feedbackType}
                  onFeedbackRestartRequest={handleRestartFeedback}
                  onFeedbackSent={() => setFeedbackSent(true)}
                />
              )
            }
          </>
        )
      }
      <footer className="text-xs text-neutral-400">
        Feito com ❤ por <a href="https://www.rocketseat.com.br/" className="underline underline-offset-2" target="_blank" >Rocketseat</a>  e Zadraki
      </footer>
    </div>
  )
}