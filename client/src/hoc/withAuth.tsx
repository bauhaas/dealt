import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent: any) => {
  const WithAuthComponent = (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return; // Do nothing while loading
      if (!session) router.push("/signin"); // Redirect if no session
    }, [session, status]);

    if (status === "loading" || !session) {
      return <div>Loading...</div>; // Show a loading message while checking session
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${getDisplayName(
    WrappedComponent
  )})`;

  return WithAuthComponent;
};

function getDisplayName(WrappedComponent: any) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAuth;
