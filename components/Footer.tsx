import Image from "next/image";
import Link from "next/link";

import {footerLinks} from "@/constant";

type ColumnProps = {
	title: string;
	links: Array<string>;
};

const FooterColumn = ({title, links}: ColumnProps) => (
	<div className="footer_column">
		<h4 className="font-semibold">{title}</h4>
		<ul className="flex flex-col gap-2 font-normal">
			{links.map((link) => (
				<Link href="/" key={link}>
					{link}
				</Link>
			))}
		</ul>
	</div>
);

const Footer = () => (
	<section className="flexStart footer">
		<div className="flex flex-col gap-12 w-full">
			<div className="flex flex-wrap gap-12">
				<FooterColumn
					title={footerLinks[0].title}
					links={footerLinks[0].links}
				/>

				<FooterColumn
					title={footerLinks[1].title}
					links={footerLinks[1].links}
				/>
				<FooterColumn
					title={footerLinks[2].title}
					links={footerLinks[2].links}
				/>
			</div>
		</div>

		<div className="flexBetween footer_copyright">
			<p>@ 2023 . All rights reserved</p>
		</div>
	</section>
);

export default Footer;
