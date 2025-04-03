import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Settings, UserCircle, Bell, Moon, Sun } from "lucide-react";

const SettingsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if dark mode preference exists in localStorage
    const savedPreference = localStorage.getItem("dark-mode");
    return (
      savedPreference === "true" ||
      document.documentElement.classList.contains("dark")
    );
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // Handle profile update
  const handleProfileUpdate = () => {
    // This would normally connect to a backend
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully",
    });
  };

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("dark-mode", String(newDarkMode));

    toast({
      title: `${newDarkMode ? "Dark" : "Light"} mode activated`,
      description: `Theme has been switched to ${
        newDarkMode ? "dark" : "light"
      } mode`,
    });
  };

  // Handle notifications toggle
  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);

    toast({
      title: `Notifications ${!notificationsEnabled ? "enabled" : "disabled"}`,
      description: `You will ${
        !notificationsEnabled ? "now" : "no longer"
      } receive notifications`,
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <UserCircle className="h-4 w-4" />
            <span>Account</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Appearance</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account details and manage your personal
                information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="principal">Internet Identity</Label>
                <Input
                  id="principal"
                  value={user?.principal || ""}
                  disabled
                  className="bg-slate-100 dark:bg-slate-800"
                />
                <p className="text-xs text-muted-foreground">
                  Your unique Internet Identity cannot be changed.
                </p>
              </div>

              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your preferred username"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleProfileUpdate}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how DeCoFi looks and feels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark theme
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4 text-muted-foreground" />
                  <Switch
                    id="dark-mode"
                    checked={isDarkMode}
                    onCheckedChange={handleThemeToggle}
                  />
                  <Moon className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about account activity
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={handleNotificationsToggle}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
