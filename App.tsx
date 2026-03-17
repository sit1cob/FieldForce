/**
 * FieldForce React Native App
 * Login Screen Implementation
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, View, Image } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ServiceOrdersListScreen from './src/screens/ServiceOrdersListScreen';
import ServiceOrderDetailsScreen from './src/screens/ServiceOrderDetailsScreen';
import MyAssignmentsListScreen from './src/screens/MyAssignmentsListScreen';
import AssignmentDetailsScreen from './src/screens/AssignmentDetailsScreen';
import RescheduleScreen from './src/screens/RescheduleScreen';
import AccountScreen from './src/screens/AccountScreen';
import MarkArrivedDialog from './src/screens/MarkArrivedDialog';
import JobCompleteDialog from './src/screens/JobCompleteDialog';
import DiagnosticCompleteScreen from './src/screens/DiagnosticCompleteScreen';
import FinishForTodaySuccessScreen from './src/screens/FinishForTodaySuccessScreen';
import OrderCompletedScreen from './src/screens/OrderCompletedScreen';
import JobCompleteSuccessScreen from './src/screens/JobCompleteSuccessScreen';
import CustomerNotHomeScreen from './src/screens/CustomerNotHomeScreen';
import CustomerNotHomeSuccessScreen from './src/screens/CustomerNotHomeSuccessScreen';
import ApplianceDetailsScreen from './src/screens/ApplianceDetailsScreen';
import SelectModelScreen from './src/screens/SelectModelScreen';
import ModelPartsScreen from './src/screens/ModelPartsScreen';
import YourCartScreen from './src/screens/YourCartScreen';
import PartEnquiryScreen from './src/screens/PartEnquiryScreen';
import ReleaseNotesScreen from './src/screens/ReleaseNotesScreen';
import TrackOrderScreen from './src/screens/TrackOrderScreen';
import TrackOrderDetailScreen from './src/screens/TrackOrderDetailScreen';
import TrackPartsScreen from './src/screens/TrackPartsScreen';
import PartsHomeScreen from './src/screens/PartsHomeScreen';
import EarningsScreen from './src/screens/EarningsScreen';
import CustomerReviewsScreen from './src/screens/CustomerReviewsScreen';
import PerformanceScreen from './src/screens/PerformanceScreen';
import SashaAIChatScreen from './src/screens/SashaAIChatScreen';
import ApiService from './src/api/apiService';
// import { navigationRef } from './src/navigation/navigationRef'; // Removing this import as we are using local ref
import AnalyticsService from './src/utils/analytics';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#003D82',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 12,
          paddingTop: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIcon: ({ focused, size }) => {
          const iconSize = size + 4;

          const pillStyle = {
            paddingHorizontal: 12,
            paddingVertical: 4,
            marginBottom: 4,
            borderRadius: 999,
            backgroundColor: focused ? '#E5F0FF' : 'transparent',
          } as const;

          let source: any = null;
          if (route.name === 'HomeTab') {
            source = require('./src/assets/tab-home.png');
          } else if (route.name === 'ChatTab') {
            source = require('./src/assets/tab-chat.png');
          } else if (route.name === 'JobsTab') {
            source = require('./src/assets/tab-jobs.png');
          } else if (route.name === 'PartsTab') {
            source = require('./src/assets/tab-parts.png');
          } else if (route.name === 'EarningsTab') {
            source = require('./src/assets/tab-earnings.png');
          }

          if (!source) return null;

          return (
            <View style={pillStyle}>
              <Image
                source={source}
                style={{ width: iconSize, height: iconSize, resizeMode: 'contain' }}
              />
            </View>
          );
        },
        tabBarItemStyle: {
          paddingVertical: 0,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="ChatTab"
        component={SashaAIChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarBadge: 'AI',
          tabBarBadgeStyle: {
            backgroundColor: '#22C55E',
            color: '#FFFFFF',
            fontSize: 10,
          },
        }}
      />
      <Tab.Screen
        name="JobsTab"
        component={MyAssignmentsListScreen}
        options={{
          tabBarLabel: 'Jobs',
          tabBarBadge: 5,
          tabBarBadgeStyle: {
            backgroundColor: '#EF4444',
            color: '#FFFFFF',
          },
        }}
      />
      <Tab.Screen
        name="PartsTab"
        component={PartsHomeScreen}
        options={{
          tabBarLabel: 'Parts',
          tabBarBadge: 3,
          tabBarBadgeStyle: {
            backgroundColor: '#F97316',
            color: '#FFFFFF',
          },
        }}
      />
      <Tab.Screen
        name="EarningsTab"
        component={EarningsScreen}
        options={{
          tabBarLabel: 'Earnings',
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const routeNameRef = React.useRef<string | undefined>(undefined);
  const navigationRef = React.useRef<any>(null);

  useEffect(() => {
    // MaterialIcons font loading removed as we are using SVGs now


    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      console.log('🔐 Checking authentication status on app start...');
      const token = await ApiService.getToken();

      if (token) {
        console.log('✅ User is authenticated - Token found:', token.substring(0, 20) + '...');
        setIsAuthenticated(true);
      } else {
        console.log('❌ User is NOT authenticated - No token found');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('❌ Error checking auth status:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Or a splash screen
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRoute = navigationRef.current.getCurrentRoute();
        const currentRouteName = currentRoute.name;

        if (previousRouteName !== currentRouteName) {
          await AnalyticsService.logScreenView(currentRouteName, currentRouteName);
          routeNameRef.current = currentRouteName;
        }
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#003D82" />
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Main' : 'Login'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="ServiceOrders" component={ServiceOrdersListScreen} />
        <Stack.Screen name="ServiceOrderDetails" component={ServiceOrderDetailsScreen} />
        <Stack.Screen name="MyAssignments" component={MyAssignmentsListScreen} />
        <Stack.Screen name="AssignmentDetails" component={AssignmentDetailsScreen} />
        <Stack.Screen name="Reschedule" component={RescheduleScreen} />
        <Stack.Screen
          name="MarkArrived"
          component={MarkArrivedDialog}
          options={{
            presentation: 'transparentModal',
            cardOverlayEnabled: true,
            cardStyle: { backgroundColor: 'transparent' },
          }}
        />
        <Stack.Screen
          name="JobComplete"
          component={JobCompleteDialog}
          options={{
            presentation: 'transparentModal',
            cardOverlayEnabled: true,
            cardStyle: { backgroundColor: 'transparent' },
          }}
        />
        <Stack.Screen name="DiagnosticComplete" component={DiagnosticCompleteScreen} />
        <Stack.Screen name="FinishForTodaySuccess" component={FinishForTodaySuccessScreen} />
        <Stack.Screen name="JobCompleteSuccess" component={JobCompleteSuccessScreen} />
        <Stack.Screen name="OrderCompleted" component={OrderCompletedScreen} />
        <Stack.Screen name="CustomerNotHome" component={CustomerNotHomeScreen} />
        <Stack.Screen name="CustomerNotHomeSuccess" component={CustomerNotHomeSuccessScreen} />
        <Stack.Screen name="ApplianceDetails" component={ApplianceDetailsScreen} />
        <Stack.Screen name="SelectModel" component={SelectModelScreen} />
        <Stack.Screen name="ModelParts" component={ModelPartsScreen} />
        <Stack.Screen name="YourCart" component={YourCartScreen} />
        <Stack.Screen name="PartEnquiryScreen" component={PartEnquiryScreen} />
        <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
        <Stack.Screen name="TrackOrderDetail" component={TrackOrderDetailScreen} />
        <Stack.Screen name="TrackPartsScreen" component={TrackPartsScreen} />
        <Stack.Screen name="Earnings" component={EarningsScreen} />
        <Stack.Screen
          name="ReleaseNotes"
          component={ReleaseNotesScreen}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'push',
          }}
        />
        <Stack.Screen name="CustomerReviews" component={CustomerReviewsScreen} />
        <Stack.Screen name="Performance" component={PerformanceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
