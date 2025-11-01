import React from 'react'
import { Button } from '../ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Pagination = ({ totalPages }: { totalPages: number }) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const updateParams = (updates: Record<string, string | number | undefined>) => {
        const newParams = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) => {
            if (value === undefined || value === null || value === "" || value === 0) {
                newParams.delete(key);
            } else {
                newParams.set(key, String(value));
            }
        });
        router.push(`${pathname}?${newParams.toString()}`);
    };

    return (
        <>
            <div className="flex justify-center gap-2 mt-12 ">
                <div className='bg-white shadow-xs p-2 rounded-md flex gap-2'>

                    <Button
                        className='bg-gray-100 border border-gray-300 hover:bg-gray-200  cursor-pointer'
                        onClick={() => updateParams({ page: page - 1 })}
                        disabled={page === 1}
                    ><i className="ri-arrow-left-line"></i>
                        Previous
                    </Button>
                    {[...Array(totalPages)].map((_, i) => (
                        <Button
                            key={i}
                            onClick={() => updateParams({ page: i + 1 })}
                            className={page === i + 1 ? "bg-blue-600 text-white  cursor-pointer" : "bg-gray-100  cursor-pointer"}
                        >
                            {i + 1}
                        </Button>
                    ))}
                    <Button
                        className='bg-gray-100 border border-gray-300 hover:bg-gray-200 cursor-pointer'
                        onClick={() => updateParams({ page: page + 1 })}
                        disabled={page === totalPages}
                    >
                        Next
                        <i className="ri-arrow-right-line"></i>
                    </Button>
                </div>
            </div>
        </>

    )
}

export default Pagination