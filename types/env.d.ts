/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 字符前缀 */
  VITE_PREFIX: string
  /** 网站标题 */
  VITE_TITLE: string
  /** 网站关键词 */
  VITE_KEYWORD: string
  /** 网站描述 */
  VITE_DESCRIPTION: string
  /** 版权公司 */
  VITE_COPYRIGHT: string
  /** API */
  VITE_API: string
  /** PROXY API */
  VITE_PROXY_API: string
}

interface ImportMeta {
  readonly env: Readonly<ImportMetaEnv>
}