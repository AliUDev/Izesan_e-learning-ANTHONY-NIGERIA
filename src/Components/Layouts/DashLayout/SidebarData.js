// import Lesson from "../../../assets/images/lesson.png";
import LessonIcon from '../../../assets/images/lessons.png';
import LessonSelectedIcon from '../../../assets/images/lessons_selected.png';

import DwekiSelected from '../../../assets/images/dweki_selected.png';
import Dweki from '../../../assets/images/dweki_unselected.png';
import LiveClassesIcon from '../../../assets/images/live_classes.png';
import LiveClassesSelectedIcon from '../../../assets/images/live_classes_selected.png';

import FavouriteIcon from '../../../assets/images/favorite.png';
import FavouriteSelectedIcon from '../../../assets/images/favorite_selected.png';

import BankIcon from '../../../assets/images/bank.png';
import BankSelectedIcon from '../../../assets/images/bank_selected.png';

import CalenderIcon from '../../../assets/images/calendar.png';
import CalenderSelectedIcon from '../../../assets/images/calendar_selected.png';

import InboxIcon from '../../../assets/images/inbox.png';
import InboxSelectedIcon from '../../../assets/images/inbox_selected.png';

import LeaderboardIcon from '../../../assets/images/leaderboard.png';
import LeaderboardSelectedIcon from '../../../assets/images/leaderboard_selected.png';

import LyricsIcon from '../../../assets/images/lyrics.png';
import LyricsSelectedIcon from '../../../assets/images/lyrics_green.png';

import DailyPerformanceIcon from '../../../assets/images/daily_performance.png';
import DailyPerformanceSelectedIcon from '../../../assets/images/daily_performance_green.png';

import StreakBoardIcon from '../../../assets/images/streak_board.png';
import StreakBoardSelectedIcon from '../../../assets/images/streak_board_green.png';

import LanguageIcon from '../../../assets/images/language.png';
import LanguageSelectedIcon from '../../../assets/images/language_selected.png';
import UserIcon from '../../../assets/images/user.png';
import UserSelectedIcon from '../../../assets/images/user_selected.png';

import ChangePasswordSelectedIcon from '../../../assets/images/change_password_selected.png';
import ChangePasswordIcon from '../../../assets/images/change_password_unselected.png';

import NewsUpdateIcon from '../../../assets/images/news.png';
import NewsUpdateSelectedIcon from '../../../assets/images/news_green.png';

import TutorIcon from '../../../assets/images/tutor.png';
import TutorSelectedIcon from '../../../assets/images/tutor_green.png';

import ReportProblemIcon from '../../../assets/images/report_bug.png';
import ReportProblemSelectedIcon from '../../../assets/images/report_bug_green.png';

import PromoIcon from '../../../assets/images/promo.png';
import PromoSelectedIcon from '../../../assets/images/promo_green.png';

import DeletePasswordIcon from '../../../assets/images/delete_unselected.png';
import LogoutIcon from '../../../assets/images/logout.png';

import LibraryIcon from '../../../assets/images/inbox.png';

export const sidebarData = [
  {
    label: 'Lessons',
    path: '/lessons',
    icon: LessonIcon,
    iconSelected: LessonSelectedIcon,
    showNavDrawer: false
  },
  {
    label: 'Daily Performance',
    path: '/notification/stats',
    icon: DailyPerformanceIcon,
    iconSelected: DailyPerformanceSelectedIcon,
    showNavDrawer: false
  },
  {
    label: 'Live Classes',
    path: '/live-classes',
    icon: LiveClassesIcon,
    showNavDrawer: false,
    iconSelected: LiveClassesSelectedIcon
  },
  {
    label: 'Inbox',
    path: '/inbox',
    showNavDrawer: false,
    icon: InboxIcon,
    iconSelected: InboxSelectedIcon
  },
  {
    label: 'Aza',
    path: '/aza',
    showNavDrawer: false,
    icon: BankIcon,
    iconSelected: BankSelectedIcon
  },
  {
    label: 'Favorites',
    path: '/favorites',
    showNavDrawer: false,
    icon: FavouriteIcon,
    iconSelected: FavouriteSelectedIcon
  },
  {
    label: 'Users',
    path: '/users',
    showNavDrawer: false,
    icon: UserIcon,
    iconSelected: UserSelectedIcon
  },
  {
    label: 'Languages',
    path: '/languages',
    showNavDrawer: false,
    icon: LanguageIcon,
    iconSelected: LanguageSelectedIcon
  },
  // {
  //   label: 'Info',
  //   path: '/info',
  //   icon: InfoIcon,
  //   showNavDrawer: false,
  //   iconSelected: InfoSelectedIcon
  // },
  {
    label: 'Streak Leaderboard',
    path: '/streak-board',
    showNavDrawer: false,
    icon: StreakBoardIcon,
    iconSelected: StreakBoardSelectedIcon
  },
  {
    label: 'Leaderboard',
    showNavDrawer: false,
    path: '/leader-board',
    icon: LeaderboardIcon,
    iconSelected: LeaderboardSelectedIcon
  },
  {
    label: 'Bookings',
    path: '/booking',
    icon: CalenderIcon,
    showNavDrawer: false,
    iconSelected: CalenderSelectedIcon
  },
  {
    label: 'Tutor-Bookings',
    path: '/user-booking',
    icon: CalenderIcon,
    showNavDrawer: false,
    iconSelected: CalenderSelectedIcon
  },
  {
    label: 'Izesan Tutor',
    path: '/izesan-tutor',
    icon: TutorIcon,
    showNavDrawer: false,
    iconSelected: TutorSelectedIcon
  },
  {
    label: 'Izedu',
    path: '/izedu',
    icon: LyricsIcon,
    showNavDrawer: false,
    iconSelected: LyricsSelectedIcon
  },
  {
    label: 'Dweki',
    path: '/dweki',
    icon: Dweki,
    showNavDrawer: false,
    iconSelected: DwekiSelected
  },
  {
    label: 'Promote',
    path: '/promote',
    icon: PromoIcon,
    showNavDrawer: false,
    iconSelected: PromoSelectedIcon
  },
  {
    label: 'Report-A-Problem',
    path: '/report-a-problem',
    icon: ReportProblemIcon,
    showNavDrawer: false,
    iconSelected: ReportProblemSelectedIcon
  },
  {
    label: 'Become a Tutor',
    path: '/tutor',
    icon: TutorIcon,
    showNavDrawer: false,
    iconSelected: TutorSelectedIcon
  },
  {
    label: 'News Updates',
    path: '/news',
    icon: NewsUpdateIcon,
    showNavDrawer: false,
    iconSelected: NewsUpdateSelectedIcon
  },
  {
    label: 'Library',
    path: '/library',
    icon: LibraryIcon,
    showNavDrawer: false,
    iconSelected: LibraryIcon
  },
  {
    label: 'Change Password',
    path: '/change-password',
    icon: ChangePasswordIcon,
    showNavDrawer: false,
    iconSelected: ChangePasswordSelectedIcon
  },
  {
    label: 'Delete Account',
    path: '',
    icon: DeletePasswordIcon,
    showNavDrawer: false,
    iconSelected: DeletePasswordIcon
  },
  {
    label: 'Logout',
    path: '',
    icon: LogoutIcon,
    showNavDrawer: false,
    iconSelected: LogoutIcon
  }
];
