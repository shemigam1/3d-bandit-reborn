import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/authcontext";

interface ProfileCardProps {
  // user: {
  //   name: string;
  //   email: string;
  //   avatarUrl?: string;
  // };
  className?: string;
}

export function ProfileCard(className: ProfileCardProps) {
  // Get initials from name for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  let { user } = useAuth();

  if (!user) {
    user = {
      id: "001",
      username: "John Doe",
      email: "ZVX7d@example.com",
    };
  }
  const avatarUrl = "https://github.com/shadcn.png";

  return (
    <Card className={`w-full max-w-xs ${className}`}>
      <CardHeader className="">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatarUrl} alt={user?.username} />
            <AvatarFallback className="text-lg font-semibold">
              {getInitials(user?.username)}
            </AvatarFallback>
          </Avatar>
          <div className="">
            <h3 className="font-semibold text-lg leading-none">
              {user.username}
            </h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </CardHeader>
      {/* <CardContent className="text-center space-y-2"></CardContent> */}
    </Card>
    // <div className="">card</div>
  );
}
