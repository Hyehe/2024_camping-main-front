import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const useAuthStore = create(
  persist( (set) => ({
    user : null,            // 사용자 정보
    token : null,           //JWT 토큰
    isAuthenticated : false, //로그인 여부
    login : (user, token) => {
      set({user, token, isAuthenticated : true})  //로그인 성공 시 처리
    },
    logout : () => {
      set({user: null, token: null, isAuthenticated: false}) //로그아웃 시 처리

      //로컬 스토리지 삭제로 보안 강화
      localStorage.removeItem("auth-storage");
    },

    reset: () => {
      set({user:null, token: null, isAuthenticated: false});
    }
  }),
  {
    name: "auth-storage",
    getStorage: () => localStorage
  })
)

export default useAuthStore;