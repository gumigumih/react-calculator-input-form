// スタイルの型定義
declare module '@gumigumih/react-calculator-input-form/styles' {
  const styles: string;
  export default styles;
}

// CSSファイルの型定義
declare module '*.css' {
  const content: string;
  export default content;
}

// スタイルの自動読み込み用
declare module '@gumigumih/react-calculator-input-form' {
  // スタイルが自動的に読み込まれることを示す
  export {};
}
