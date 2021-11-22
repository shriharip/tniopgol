
import { useSession, signIn, signOut } from "next-auth/react"
export default function NavBar() {
	const { data: session } = useSession();

	return (
		<>
			<div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
				<div className="flex-1 px-2 mx-2">
					<span className="text-lg font-bold">
						LogPointJS
					</span>
				</div>

				{
					session && <div className="flex-none px-2 mx-2 lg:flex">
						<div className="flex">
							<button onClick={() => signOut()} className="btn btn-ghost btn-sm rounded-btn">

								Sign Out

							</button>

						</div>
					</div>
				}
				{!session && <div className="flex-none px-2 mx-2 lg:flex">
					<div className="flex">
						<button onClick={() => signIn()} className="btn btn-ghost btn-sm rounded-btn">

							Register

						</button>

					</div>

				</div>}

			</div>

		</>
	)

}