import women from '../assets/black.jpg';
import a from '../assets/pexels-chloekalaartist-1043474.jpg';
import b from '../assets/pexels-olly-839011.jpg';

export function Dashboardremcomponents() {
    return (<>
        <div className="grid grid-cols-1 gap-14 p-2 sm:grid-cols-2 sm:p-10">
            <div className="rounded-xl border bg-white p-6 pb-10 text-black w-full hover:-translate-y-3 duration-700 shadow-xl">
                <p className="text-xl font-extrabold">Insights</p>
                <div className="mt-4 flex items-center rounded-lg bg-gray-100 py-1 px-2 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6 shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg">Your views are up 400% since last month</p>
                </div>
                <div className="mt-4 flex items-center rounded-lg bg-gray-100 py-1 px-2 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6 shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg">Your blog got featured on awwwards.com</p>
                </div>
                <div className="mt-4 flex items-center rounded-lg bg-gray-100 py-1 px-2 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6 shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg">IFFHA Published your site in the top best 50 Websites in the world.</p>
                </div>
                <div className="mt-4 flex items-center rounded-lg bg-gray-100 py-1 px-2 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6 shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg">Best market choice for past 4 hours.</p>
                </div>
            </div>

            <div className="w-full rounded-xl border bg-gray-300 p-6 pb-10 text-gray-900 hover:-translate-y-3 duration-700 shadow-2xl">
                <p className="text-xl font-extrabold">Activity</p>
                <div className="flex items-center py-2">
                    <img className="h-10 w-10 rounded-full object-cover" src={women} alt="Simon Lewis" />
                    <p className="ml-4 w-56">
                        <strong className="block font-bold text-yellow-500">Albert Mcalister</strong>
                        <span className="text-xs text-black"> Commented on <a className="truncate font-large text-indigo-600" href="#">Y-Mart</a> </span>
                    </p>
                </div>
                <div className="flex items-center py-2">
                    <img className="h-10 w-10 rounded-full object-cover" src={a} alt="" />
                    <p className="ml-4 w-56">
                        <strong className="block font-bold text-yellow-500">Samantha Ribbon</strong>
                        <span className="text-xs text-black"> Commented on <a className="truncate font-large text-indigo-600" href="#">Y-Mart</a> </span>
                    </p>
                </div>
                <div className="flex items-center py-2">
                    <img className="h-10 w-10 rounded-full object-cover" src={b} alt="" />
                    <p className="ml-4 w-56">
                        <strong className="block font-bold text-yellow-500">Dr. Kayla</strong>
                        <span className="text-xs text-black"> Commented on <a className="truncate font-large text-indigo-600" href="#">Y-Mart</a> </span>
                    </p>
                </div>
            </div>

        </div>
        <div className='flex items-center justify-center hover:-translate-y-3 duration-700 shadow-xl '>
            <div className="w-full rounded-xl border bg-white p-6 pb-10 text-gray-900">
                <p className="text-xl font-extrabold">Traffic Sources</p>
                <div className="mt-4">
                    <p className="float-left mb-2">Direct</p>
                    <span className="float-right mb-2">20,00</span>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                        <div className="h-full w-10/12 overflow-hidden rounded-full bg-indigo-600"></div>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="float-left mb-2">Referral</p>
                    <span className="float-right mb-2">2,000</span>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                        <div className="h-full w-4/12 overflow-hidden rounded-full bg-indigo-600"></div>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="float-left mb-2">Google</p>
                    <span className="float-right mb-2">1,500</span>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                        <div className="h-full w-3/12 overflow-hidden rounded-full bg-indigo-600"></div>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="float-left mb-2">Facebook</p>
                    <span className="float-right mb-2">260</span>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                        <div className="h-full w-1/12 overflow-hidden rounded-full bg-indigo-600"></div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}