import { CloseButton } from "../../CloseButton";
import { FeedbackType, feedbackTypes } from '../';
import { ArrowArcLeft, Camera } from "phosphor-react";
import { ScreenshotButton } from "../ScreenshotButton";
import { FormEvent, useState } from 'react';
import { api } from "../../../libs/api";
import { Loading } from "../../Loading";

type FeedbackContentStepProps = {
  feedbackType: FeedbackType;
  onFeedbackRestartRequest: () => void;
  onFeedbackSent: () => void;
}
export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequest, onFeedbackSent }: FeedbackContentStepProps) {

  const feedbackTypeInfo = feedbackTypes[feedbackType]
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  const handleSubmitFeedback = async (event: FormEvent) => {
    event.preventDefault()
    setIsSendingFeedback(true)

    await api.post('feedbacks', {
      type: feedbackType,
      comment,
      screenshot
    })
    setIsSendingFeedback(false)

    onFeedbackSent()
  }

  return (
    <>
      <header className="text-xl leading-6 flex items-center gap-2">
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          title='Voltar um passo'
          onClick={onFeedbackRestartRequest}
        >
          <ArrowArcLeft weight="bold" className="w-4 h-4" />
        </button>
        <img src={feedbackTypeInfo.image.src} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
        <span>{feedbackTypeInfo.title}</span>
        <CloseButton />
      </header>
      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          onChange={event => setComment(event.target.value)}
          placeholder="Conte com detalhes o que está acontecendo."
          className="min-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700" />

        <footer className="flex gap-2 mt-2" >

          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            disabled={comment.length === 0 || isSendingFeedback}
            type="submit"
            className="p-2 bg-brand-500 rounded-md flex-1 border-transparent flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:to-brand-500 disabled:cursor-not-allowed"
          >
            {
              isSendingFeedback ? <Loading /> : 'Enviar feedback'
            }
          </button>
        </footer>
      </form>
    </>
  )
}