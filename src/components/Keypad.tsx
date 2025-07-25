/** biome-ignore-all lint/a11y/useFocusableInteractive: <explanation> */
/** biome-ignore-all assist/source/organizeImports: <explanation> */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
import { isMobileAgent } from "../utils/isMobileAgent";
import { useVirtualInputContext } from "./Context";
import { useCallback, type MouseEvent } from "react";
import { ShadowWrapper } from "./ShadowWrapper";
import { convertQwertyToHangul } from "es-hangul";

declare module "react" {
	interface CSSProperties {
		[key: `--${string}`]: string | number;
	}
}

export type KeypadLayout = {
	label: string;
	value: string;
	width?: number;
	height?: number;
	type?: string;
}[][];

export type Viewport = {
	width: number;
	height: number;
	scale: number;
	offsetLeft: number;
	offsetTop: number;
};

export function VirtualKeypad({
	layout,
	viewport,
}: {
	layout: KeypadLayout;
	viewport: Viewport;
}) {
	const {
		focusId,
		onBlur,
		onFocus,
		inputRef,
		shift,
		hangulMode,
		toggleShift,
		toggleKorean,
	} = useVirtualInputContext();

	const handleFocus = useCallback(() => {
		if (!focusId) return;
		onFocus(focusId);
	}, [onFocus, focusId]);
	const getTransformedValue = useCallback(
		(cell: { label?: string; value: string; type?: string }) => {
			if (cell.type === "char") {
				if (hangulMode) {
					return convertQwertyToHangul(cell.value);
				}
				if (shift) {
					return cell.value.toUpperCase();
				}
				return cell.value;
			}

			return cell.label ?? cell.value;
		},
		[hangulMode, shift],
	);

	const insertCharacter = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			const target = e.target;
			if (!(target instanceof HTMLButtonElement)) return;

			const { value, dataset } = target;
			const type = dataset.type as "char" | "action";

			if (type === "action") {
				if (value === "Shift") {
					toggleShift();
					return;
				}
				if (value === "HangulMode") {
					toggleKorean();
					return;
				}
			}

			const event = new KeyboardEvent("keydown", {
				key: getTransformedValue({
					value,
					type,
				}),
				code: `Key${value.toUpperCase()}`,
				bubbles: true,
				cancelable: true,
				shiftKey: shift,
			});
			inputRef.current?.handleKeyDown(event);
		},
		[inputRef, shift, toggleShift, toggleKorean, getTransformedValue],
	);
	if (!focusId || !isMobileAgent()) return null;
	return (
		<ShadowWrapper
			tagName={"virtual-keypad" as "div"}
			css={`
        .keypad-container {
          display: flex;
          flex-direction: column;
          position: fixed;
          background-color: #f0f2f5;
          padding: calc(8px / var(--scale-factor));
          box-sizing: border-box;
          gap: calc(8px / var(--scale-factor));
          box-shadow: 0 calc(-2px / var(--scale-factor)) calc(10px / var(--scale-factor)) rgba(0, 0, 0, 0.1);
          user-select: none;
          touch-action: manipulation;
        }
        .keypad-row {
          display: flex;
          flex: 1;
          gap: calc(8px / var(--scale-factor));
        }
        @keyframes key-pop {
          from {
            opacity: 0.9;
            transform: translate(-50%, 5px) scale(1);
          }
          to {
            opacity: 1;
            transform: translate(-50%, calc(-15px / var(--scale-factor))) scale(1.4);
          }
        }
        @keyframes key-press {
          from { transform: scale(1); }
          to { transform: scale(0.96); }
        }
        .keypad-button {
          position: relative;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #ffffff;
          border: calc(1px / var(--scale-factor)) solid #ccc;
          border-radius: calc(8px / var(--scale-factor));
          font-size: calc(18px / var(--scale-factor));
          font-weight: 500;
          color: #333;
          cursor: pointer;
          box-shadow: 0 calc(2px / var(--scale-factor)) calc(2px / var(--scale-factor)) rgba(0, 0, 0, 0.05);
        }
        .keypad-button:active {
          animation: key-press 0.05s forwards;
        }
        .key-popup {
          display: none;
          position: absolute;
          left: 50%;
          bottom: 80%;
          min-width: 100%;
          padding: calc(8px / var(--scale-factor)) calc(12px / var(--scale-factor));
          background-color: #f9fafb;
          color: #333;
          border-radius: calc(10px / var(--scale-factor));
          box-shadow: 0 calc(-2px / var(--scale-factor)) calc(10px / var(--scale-factor)) rgba(0, 0, 0, 0.15);
          pointer-events: none;
          font-size: calc(26px / var(--scale-factor));
          font-weight: 500;
          text-align: center;
          z-index: 10;
          line-height: 1.2;
        }
        .keypad-button:active .key-popup {
          display: block;
          animation: key-pop 0.1s ease-out forwards;
        }
       
      `}
		>
			<div
				onFocus={handleFocus}
				onBlur={onBlur}
				tabIndex={-1}
				className="keypad-container"
				style={{
					left: viewport.offsetLeft,
					width: viewport.width,
					top: Math.round(
						viewport.offsetTop + viewport.height - 200 / viewport.scale,
					),
					height: Math.round(200 / viewport.scale),
					"--scale-factor": viewport.scale,
				}}
			>
				{layout?.map((row, i) => (
					<div className="keypad-row" key={i}>
						{row.map((cell, j) => (
							<button
								type="button"
								value={cell.value}
								data-type={cell.type}
								onClick={insertCharacter}
								className={`keypad-button ${cell.type === "action" ? "action" : ""}`}
								key={`${i}-${j}`}
							>
								{getTransformedValue(cell)}
								<div className="key-popup">{getTransformedValue(cell)}</div>
							</button>
						))}
					</div>
				))}
			</div>
		</ShadowWrapper>
	);
}
