import create from 'zustand';

// set method로 상태 변경 가능
const useStore = create(set => ({
  email:"hello",
  setEmail: (input) => set({ email: input }),
  password:"",
  setPassword: (input) => set({ password: input}),
  nickname:"",
  setNickname: (input) => set({ nickname: input}),
  page:2,
  setPage: (input) => set({ page:input }),
  login:false,
  setLogin: (input) => set({login:input}),


  prevScrollHeight:0,
  setPrevScrollHeight: (input) => set({prevScrollHeight:input}),

  liveScrollHeight:0,
  setLiveScrollHeight: (input) => set({liveScrollHeight:input}),

  scrollBottom:1,
  setScrollBottom:(input) => set({ scrollBottom:input }),

  sec:10,
  setSec:() => set({ sec:10 }),

  view:10,
  setView:(input) => set({ view:input }),

  img:"",
  setImg:(input) => set({ img:input })
}));



export default useStore