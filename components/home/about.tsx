import Image from "next/image";
import { languages, principles } from "@/lib/content";
import portrait from "@/public/bensu.png";

export default function About() {
    return (
        <section
            id="about"
            className="about"
            data-solid
            aria-labelledby="about-title"
        >
            <div className="shell about-grid">
                <figure className="portrait" data-reveal>
                    <div className="portrait-frame">
                        <Image
                            src={portrait}
                            alt="Portrait of Elif Bensu Zorlu smiling outdoors"
                            sizes="(max-width: 900px) 90vw, 460px"
                            placeholder="blur"
                        />
                    </div>
                    <figcaption className="mono">Bensu, for short</figcaption>
                </figure>

                <div className="about-copy">
                    <p className="eyebrow mono" data-reveal>
                        <span>04</span> About
                    </p>
                    <h2 id="about-title" className="section-title" data-reveal>
                        A business mind with <em>an engineer’s habits.</em>
                    </h2>
                    <div className="about-story" data-reveal>
                        <p>
                            Before I wrote production code, I spent four years
                            in aerospace contracts at TEI, managing contracts
                            and licensing with international customers and
                            suppliers in a tightly regulated industry. The part
                            I loved most was building VBA and Python tools to
                            automate the repetitive work, cutting selected
                            processing times by up to 90%.
                        </p>
                        <p>
                            That turned into a career change. Today I build
                            customer-facing websites, account portals and
                            internal tools at Rix Digital, and I still bring the
                            old habits with me: clear communication with
                            stakeholders, commercial awareness, and an eye for
                            the details that make software dependable.
                        </p>
                    </div>

                    <ol className="principles">
                        {principles.map((item, index) => (
                            <li
                                key={item.title}
                                data-reveal
                                style={{ "--d": index } as React.CSSProperties}
                            >
                                <span className="mono">0{index + 1}</span>
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </li>
                        ))}
                    </ol>

                    <dl className="languages" data-reveal>
                        {languages.map((language) => (
                            <div key={language.name}>
                                <dt>{language.name}</dt>
                                <dd className="mono">{language.level}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
