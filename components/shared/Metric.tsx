import React from "react"

interface Props {
	imgSrc: string
	alt: string
	value: number
	title: string
	href: string
	textStyles: string
	isAuthor: boolean
}

const Metric = ({ imgSrc, alt, value, title, href, textStyles, isAuthor }: Props) => {
	return <div>Metric</div>
}

export default Metric
