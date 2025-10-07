import '@emotion/react'
import { SerializedStyles } from '@emotion/react'

declare module 'react' {
  interface HTMLAttributes<T> extends React.HTMLAttributes<T> {
    css?: SerializedStyles | SerializedStyles[]
  }
}
