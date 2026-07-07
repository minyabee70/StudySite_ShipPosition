import { useFontSize } from '../hooks/useFontSize'
import { useSimulation } from '../context/SimulationContext'

export default function SiteBottomBar() {
  const { percent, increase, decrease, reset, canIncrease, canDecrease } = useFontSize()
  const {
    playing,
    speedLabel,
    togglePlay,
    decreaseSpeed,
    increaseSpeed,
    canDecreaseSpeed,
    canIncreaseSpeed,
  } = useSimulation()

  return (
    <aside className="site-bottom-bar" aria-label="사이트 설정">
      <div className="site-bottom-bar__inner">
        <div className="site-bottom-bar__font" role="group" aria-label="글자 크기 조절">
          <span className="site-bottom-bar__label">글자 크기</span>
          <button
            type="button"
            className="site-bottom-bar__btn"
            onClick={decrease}
            disabled={!canDecrease}
            aria-label="글자 크기 줄이기"
          >
            A−
          </button>
          <button
            type="button"
            className="site-bottom-bar__percent"
            onClick={reset}
            aria-label={`글자 크기 보통으로 초기화 (현재 ${percent}%)`}
            title="보통 크기로 초기화"
          >
            {percent}%
          </button>
          <button
            type="button"
            className="site-bottom-bar__btn"
            onClick={increase}
            disabled={!canIncrease}
            aria-label="글자 크기 키우기"
          >
            A+
          </button>
        </div>

        <div className="site-bottom-bar__sim" role="group" aria-label="시뮬레이션 제어">
          <button
            type="button"
            className="site-bottom-bar__play"
            onClick={togglePlay}
            aria-label={playing ? '시뮬레이션 일시정지' : '시뮬레이션 재생'}
            title={playing ? '일시정지' : '재생'}
          >
            {playing ? '||' : '|>'}
          </button>
          <span className="site-bottom-bar__label">속도</span>
          <button
            type="button"
            className="site-bottom-bar__btn"
            onClick={decreaseSpeed}
            disabled={!canDecreaseSpeed}
            aria-label="시뮬레이션 속도 줄이기"
          >
            −
          </button>
          <span className="site-bottom-bar__speed">{speedLabel}</span>
          <button
            type="button"
            className="site-bottom-bar__btn"
            onClick={increaseSpeed}
            disabled={!canIncreaseSpeed}
            aria-label="시뮬레이션 속도 높이기"
          >
            +
          </button>
        </div>

        <p className="site-bottom-bar__credit">
          만든이 : 김민엽 (
          <a href="mailto:minyabee@naver.com">minyabee@naver.com</a>
          )
        </p>
      </div>
    </aside>
  )
}
