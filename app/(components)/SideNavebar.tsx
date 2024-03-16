import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/utils/constants";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import SideBarDetailSection from "./SideBarDetailSection";
const SideNavebar = async () => {
  const session = await getServerSession(authOptions);
  console.log(session, "session nav");
  const data: any = session;

  return (
    <div className=" w-64 px-5 py-10 h-full flex-col flex min-w-[270px]">
      {session && (
        <>
          <div className=" flex flex-col items-center px-5 ">
            <Image
              src="/Demo/profile.jpg"
              alt="logo"
              width={200}
              height={200}
              className="rounded-full  h-32 w-32 object-cover overflow-hidden  border-4 border-highlight "
            />
            <h1 className="text-white text[17px]  font-semibold mt-2">
              {data?.username}
            </h1>
            <h1 className="text-white text-xs">{session.user?.name}</h1>
          </div>
          <SideBarDetailSection />
        </>
      )}

      <div className="w-full rounded-md bg-secoundarybg flex flex-col justify-between mt-5 h-full pb-5">
        <ul className=" flex flex-col w-full">
          {sidebarLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.route} className="sideNavList">
                <div className="flex items-center ">
                  <Image
                    src={link.imgURL}
                    alt={link.label}
                    width={20}
                    height={20}
                    className=" transition hover:invert hover:brightness-0 text-white"
                  />
                  <span className="text-white  ml-2">{link.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className=" ">
          {session ? (
            <Link
              className="sideNavList "
              href="/api/auth/signout?callbackUrl=/"
            >
              <div className=" flex items-center transition hover:bg-mindaro-500">
                <Image
                  src="/icons/logout.svg"
                  alt="logout"
                  width={20}
                  height={20}
                />
                <span className="text-white  ml-2">Logout</span>
              </div>
            </Link>
          ) : (
            <Link href={"/signin"} className=" sideNavList">
              <div className=" flex items-center transition hover:bg-mindaro-500">
                <Image
                  src="/icons/logout.svg"
                  alt="logout"
                  width={20}
                  height={20}
                />
                <span className="text-white  ml-2">Sign-in</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideNavebar;
