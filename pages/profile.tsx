import Image from 'next/image'
import { useSession } from "next-auth/react"
import { useState } from 'react';

export default function Profile() {
	const { data: session } = useSession();
	const [isEditing, setIsEditing] = useState(false);


	return !isEditing ? <div className="card text-center shadow-xl">
		<figure className="px-10 pt-10">
			<Image alt='profileImage' src="https://picsum.photos/id/1005/400/250" width="100%" height="100%" className="rounded-xl" />
		</figure>
		<div className="card-body">
			<h2 className="card-title">{session?.user?.name}</h2>
			<p> {session?.user?.email}</p>
			<div className="justify-center card-actions">
				<button onClick={() => setIsEditing(true)} className="btn btn-outline btn-accent">Edit</button>
			</div>
		</div>
	</div>
		: <> </>

}
