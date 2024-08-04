import DashBoardNavbar from "../../SellerComponents/DashboardNavbar";
import { CiTrash } from "react-icons/ci";

const SellerInbox = () => {
  return (
    <div className="rlative ">
      <div className="sticky top-0 z-50 w-full bg-gray-50">
        <DashBoardNavbar name="Inbox" />
      </div>
      <section className="flex flex-col gap-4 mt-4">
        {Array.from({ length: 13 }).map((_, i) => {
          return (
            <div
              key={i}
              className="w-full gap-4 py-2 pr-3 transition delay-100 rounded-md shadow duration-400 bg-personal-10 btn-ghost"
            >
              <div className="relative flex items-center gap-3 cursor-pointer group">
                <div className="avatar">
                  <div className="bg-black rounded-full w-14">
                    <img src="/image/avatar.png" className="" alt="icon" />
                  </div>
                </div>
                <div className="flex items-center justify-between w-full gap-12">
                  <div>
                    <div className="text-xl font-medium line-clamp-1">
                      Order Updates Lorem, ipsum dolor sit amet consectetur
                      adipisicing elit. Repudiandae accusantium, a et mollitia
                      quam aut quidem, eligendi id nisi facere incidunt quisquam
                      est reiciendis officia doloribus quasi velit. Sequi,
                      dolore.
                    </div>
                    <span className="text-sm text-slate-400">19/13/3000</span>
                  </div>
                  <div className="transition-opacity delay-100 opacity-0 duration-400 group-hover:opacity-100">
                    <CiTrash className="p-2 text-xl btn btn-circle btn-ghost" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default SellerInbox;
