import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type Props = {
    links: {
        title: string;
        href: string;
    }[];
};

export function Breadcrumb({ links }: Props) {
    return (
        <div className='container mx-auto py-4 px-4'>
            <ul className=" flex items-center gap-x-3">
                {links.map((link, index) => {
                    return link.href === '#' ? (
                        <li key={index}>
                            <span className="text-base text-blue-400">{link.title}</span>
                        </li>
                    ) : (
                        <li key={index} className="inline-flex items-center gap-x-1">
                            <Link
                                prefetch={true}
                                className={twMerge('text-base text-black/60', index === links.length - 1 && 'text-black')}
                                href={link.href}
                            >
                                {link.title}
                            </Link>
                            {index === links.length - 1 ? null : (
                                <span className="mt-0.5 inline-block">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6.53073 2.46937L11.5307 7.46937C11.6007 7.53905 11.6561 7.62184 11.694 7.71301C11.7318 7.80417 11.7513 7.90191 11.7513 8.00062C11.7513 8.09933 11.7318 8.19707 11.694 8.28824C11.6561 8.3794 11.6007 8.46219 11.5307 8.53187L6.53073 13.5319C6.38984 13.6728 6.19874 13.7519 5.99948 13.7519C5.80023 13.7519 5.60913 13.6728 5.46823 13.5319C5.32734 13.391 5.24818 13.1999 5.24818 13.0006C5.24818 12.8014 5.32734 12.6103 5.46823 12.4694L9.93761 8L5.46761 3.53062C5.32671 3.38973 5.24756 3.19863 5.24756 2.99937C5.24756 2.80011 5.32671 2.60902 5.46761 2.46812C5.60851 2.32723 5.7996 2.24807 5.99886 2.24807C6.19812 2.24807 6.38921 2.32723 6.53011 2.46812L6.53073 2.46937Z"
                                            fill="black"
                                            fillOpacity="0.6"
                                        />
                                    </svg>
                                </span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>

    );
}