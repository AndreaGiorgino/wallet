import ProfileActions from "./_components/ProfileActions";
import ProfileData from "./_components/ProfileData";
import ProfileDelete from "./_components/ProfileDelete";

export default function Profile() {
    return (
        <div className="flex flex-col flex-1 gap-12 w-full">
            <ProfileData />
            <ProfileDelete />
            <div className="flex-1"></div>
            <ProfileActions />
        </div>
    );
}