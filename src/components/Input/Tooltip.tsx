import { TooltipIcon } from './styles/checkbox.styled';
import { Tooltip as ReactTooltip } from 'react-tooltip';

interface TooltipProps {
	text: string;
	size: number;
	id?: string;
}
export function Tooltip({
	text, size,
	id='tooltip-text',
	...props
}: TooltipProps) {
	return (
		<><TooltipIcon
			size={size * 0.8}
			data-tooltip-id={id}
			data-tooltip-content={text}
			data-tooltip-place="top"
			data-tooltip-delay-show={300}
			{...props}/>
		<ReactTooltip id={id}/></>
	)
}
