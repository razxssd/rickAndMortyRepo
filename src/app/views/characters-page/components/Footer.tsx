import React, {memo} from 'react';

interface FooterProps {
  prev?: string | null | undefined,
  next?: string | null | undefined,
  loadNewData: (url?: string | null) => void
  isPageLoading: boolean
}

export const Footer: React.FC<FooterProps> = memo(({prev, next, loadNewData, isPageLoading}) => {
  return <div className={'card-footer'}>
    {prev &&
      <button
        onClick={() => loadNewData(prev)}
        disabled={isPageLoading}>
        Prev
      </button>}
    {next &&
      <button
        className={prev ? 'ml-2' : ''}
        onClick={() => loadNewData(next)}
        disabled={isPageLoading}>
        Next
      </button>}
  </div>;
});
