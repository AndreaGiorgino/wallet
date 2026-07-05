import ProfileActions from "./_components/ProfileActions";
import ProfileData from "./_components/ProfileData";

export default function Profile() {
    return (
        <div className="flex flex-col flex-1 gap-6 w-full">
            <div className="flex-1">
                <ProfileData />
            </div>
            <hr />
            <ProfileActions />
        </div>
    );
}