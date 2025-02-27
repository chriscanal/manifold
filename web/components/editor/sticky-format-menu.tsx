import { CloudIcon } from '@heroicons/react/outline'
import {
  CodeIcon,
  PhotographIcon,
  PresentationChartLineIcon,
} from '@heroicons/react/solid'
import { Editor } from '@tiptap/react'
import React, { useState } from 'react'
import { FileUploadButton } from '../buttons/file-upload-button'
import { LoadingIndicator } from '../widgets/loading-indicator'
import { Tooltip } from '../widgets/tooltip'
import { EmbedModal } from './embed-modal'
import { DreamModal } from './image-modal'
import { MarketModal } from './market-modal'
import type { UploadMutation } from './upload-extension'

/* Toolbar, with buttons for images and embeds */
export function StickyFormatMenu(props: {
  editor: Editor | null
  children?: React.ReactNode
}) {
  const { editor, children } = props
  const upload = editor?.storage.upload.mutation

  const [dreamOpen, setDreamOpen] = useState(false)
  const [iframeOpen, setIframeOpen] = useState(false)
  const [marketOpen, setMarketOpen] = useState(false)

  return (
    <div className="text flex h-9 items-stretch border-t">
      <UploadButton upload={upload} />
      <ToolbarButton label="Add dream" onClick={() => setDreamOpen(true)}>
        <DreamModal editor={editor} open={dreamOpen} setOpen={setDreamOpen} />
        <CloudIcon className="h-5 w-5" aria-hidden />
      </ToolbarButton>
      <ToolbarButton label="Add embed" onClick={() => setIframeOpen(true)}>
        <EmbedModal editor={editor} open={iframeOpen} setOpen={setIframeOpen} />
        <CodeIcon className="h-5 w-5" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton label="Add market" onClick={() => setMarketOpen(true)}>
        <MarketModal
          editor={editor}
          open={marketOpen}
          setOpen={setMarketOpen}
        />
        <PresentationChartLineIcon className="h-5 w-5" aria-hidden="true" />
      </ToolbarButton>

      <div className="grow" />
      {children}
    </div>
  )
}

function UploadButton(props: { upload: UploadMutation }) {
  const { upload } = props

  return (
    <Tooltip text="Upload image" noTap noFade>
      <FileUploadButton
        onFiles={(files) => upload?.mutate(files)}
        className="active:bg-greyscale-3 hover:text-greyscale-6 relative flex h-full w-12 items-center justify-center text-gray-400 transition-colors"
      >
        <PhotographIcon className="h-5 w-5" aria-hidden="true" />
        {upload?.isLoading && (
          <LoadingIndicator
            className="absolute top-0 left-0 bottom-0 right-0"
            spinnerClassName="!h-6 !w-6 !border-2"
          />
        )}
      </FileUploadButton>
    </Tooltip>
  )
}

function ToolbarButton(props: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  const { label, onClick, children } = props

  return (
    <Tooltip text={label} noTap noFade>
      <button
        type="button"
        onClick={onClick}
        className="active:bg-greyscale-3 hover:text-greyscale-6 flex h-full w-12 items-center justify-center text-gray-400 transition-colors"
      >
        {children}
      </button>
    </Tooltip>
  )
}
