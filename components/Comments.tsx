var moment = require('moment');

const Comments = (props: any) => {
    return (
        <div className="w-[85%] sm:w-[94%] md:w-[50%] mx-4 mt-2 overflow-y-visible bg-[#5F5F5F] text-white rounded-lg">
            <div className="text-[14px] leading-4 flex flex-col justify-center place-items-center py-2">
                <p>
                    COMMENTS
                </p>
                <div className="h-1 w-12 bg-slate-300 rounded-lg" />
            </div>
            {props.data.map((comment: any, i: number) => {
                return (
                    <div key={i} className="flex flex-row ml-2 mb-4 overflow-hidden">
                        <img className="flex flex-col w-9 h-9 rounded-full" src={comment.userInfo.profileImg} />
                        <div className="flex flex-col pl-4 text-[15px] mb-2">
                            <div className="flex flex-row">
                                <p>@{comment.userInfo.userName}</p>
                                <div className="ml-[8px] text-[14px] text-[#EBEBEB]">
                                    {moment(comment.createdAt).fromNow()}
                                </div>
                            </div>
                            <audio controls loop controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar">
                                <source src={comment.downloadUrl[0]} type="audio/mp3" />
                            </audio>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Comments