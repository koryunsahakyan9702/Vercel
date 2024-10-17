import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchMovie=createAsyncThunk("movies/fetchMovies",async()=>{
        try {
            const response=await fetch('http://localhost:5000/TendingNow?_sort=Date&_order=desc')

            if(!response.ok){
                throw new Error("Network response was not ok")
                
            }
            const data=await response.json()

            return data
        } catch (error) {
            throw error
        }
})
export const fetchFeature=createAsyncThunk("movies/fetchFeature",async()=>{
    try {
        const response=await fetch('http://localhost:5000/Featured')
        if(!response.ok){
            throw new Error("Network response was not ok")
            
        }
        const data=await response.json()

        return data
    } catch (error) {
        throw error
    }
})
const movieSlice=createSlice({
    name:"movies",
    initialState:{
        items:[],
        status:"idle",
        error:null,
        featured:[],
        menuView:false,
        play:false,
        showVideo:true
    },
    reducers:{
        showMenu:(state,action)=>{
            state.menuView=!state.menuView
        },
        checkFeatured:(state,action)=>{
            let findMovie=state.items.find((item)=>{
                return item.Id===action.payload
            })
            state.featured=findMovie
            state.play=true
            state.showVideo=!state.showVideo
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchMovie.pending,(state,action)=>{
            state.status="loading"
        }).addCase(fetchMovie.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.items=action.payload
        }).addCase(fetchMovie.rejected,(state,action)=>{
            state.status="failed"
        }).addCase(fetchFeature.fulfilled,(state,action)=>{
            state.featured=action.payload
        })
            
        
        
    }
})
export const {showMenu,checkFeatured} =movieSlice.actions
export const movieReducer= movieSlice.reducer