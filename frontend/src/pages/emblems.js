import React, { useState } from 'react';
import axios from 'axios';
import ProfileNav from "../components/profilenav"

let emblemlist = [];

export default function Emblems(user) {

    useState(() => {
        async function fetchEmblems() {
            try {
                const response = await axios.get('http://localhost:3000/emblem/all',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                emblemlist = response.data.data;
            } catch (error) {
                console.error(error);
            }
        }

        fetchEmblems();
    }, []);

    return (
        <>
            <ProfileNav data={user.user} page="emblemas" />
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
                        Todos emblemas
                    </h2>
                    <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        {
                            emblemlist.map((emblem) => (
                                <div key={emblem.id} className="">
                                    <img
                                        key={emblem.id}
                                        style={
                                            user.user.emblems.find((userEmblem) => userEmblem.id === emblem.id)
                                                ? { filter: "grayscale(0)" }
                                                : { filter: "grayscale(100%)" }
                                        }
                                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                                        src={emblem.image}
                                        alt={emblem.name}
                                        width={158}
                                        height={48}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
