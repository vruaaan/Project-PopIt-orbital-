import back from './assets/back.png'
export default function ShopPage({ onBack }) {
    return (
            <div className="min-h-screen px-6 py-6 text-[var(--text)]">
                <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 rounded-[2rem] border border-[var(--border)] bg-[rgba(238,230,216,0.72)] p-8 shadow-[var(--shadow)] backdrop-blur-sm">
                    <div className="flex items-center justify-between gap-4">
                        <div />
                    </div>
                    <div className="flex flex-1 items-end justify-center pb-0 relative">
                        <div className="fixed left-21 top-4"> {/*positions at the top left */}
                            <div className="pagename fixed left-4 top-4">Shop.</div>
                </div>
    
                    <button
                        type="button"
                        onClick={onBack} // goback
                        className="mt-8 p-0 bg-transparent border-0 focus:outline-none rounded-full">
                        <span className="fixed right-4 top-5">
                            <img src={back} alt="back" className="block w-20 h-auto  origin-center hover:scale-105 transition-transform"/>
                        </span>
                    </button>
    
    
    
    
    
    
    
                </div>
            </div>
            </div>
        )
    }