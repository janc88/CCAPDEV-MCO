import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FlexCol } from "../../styles/Flex.styled";
import { ExpandMore, ExpandLess } from "@styled-icons/material";

interface TextProps {
	lines: number
}
const Text = styled.h2<TextProps>`
	margin: 0.5rem;
	font-weight: 300;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-line-clamp: ${({lines}) => lines};
	display: -webkit-box;
	-webkit-box-orient: vertical;
`;
const LongText = styled.h2`
	margin: 0.5rem;
	font-weight: 300;
`;

const ExpandIcon = styled(ExpandMore)`
	width: 3rem;
	height: 1.5rem;
	color: rgb(255, 121, 79);
	margin-left: auto;
	margin-right: auto;
`;
const ShrinkIcon = styled(ExpandLess)`
	width: 3rem;
	height: 1.5rem;
	color: rgb(255, 121, 79);
	margin-left: auto;
	margin-right: auto;
`

interface ShortTextProps {
	text: string;
	maxLines: number;
}
function ShortText({
	text, maxLines
}: ShortTextProps) {
	const [isOverflow, setIsOverflow] = useState(true);
	const [isExpanded, setIsExpanded] = useState(false);
	const textRef = useRef<HTMLHeadingElement>(null);
	useLayoutEffect(() => {
		if (!textRef.current) return;
		const {scrollHeight, clientHeight} = textRef.current;
		setIsOverflow(scrollHeight > clientHeight);
	}, [textRef]);
	const toggleExpandMore = () => setIsExpanded(!isExpanded);
	console.log(`overflow: ${isOverflow}, expand: ${isExpanded}`);

	return (
		<FlexCol>
			{ !isOverflow || isExpanded ? (
				<LongText ref={textRef}>{text}</LongText>
			) : (
				<Text 
					lines={maxLines}
					ref={textRef}>{text}</Text>
			)}
			{isOverflow && (isExpanded ? (
				<ShrinkIcon onClick={toggleExpandMore}/>
			) : (
				<ExpandIcon onClick={toggleExpandMore}/>
			))}
		</FlexCol>
	)
}
export default ShortText;