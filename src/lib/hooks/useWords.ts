import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { WordSchemaType } from '../schema';
import { WithId } from '@/app/types/WithId';

const fetchWords = async () => {
    const response = await axios.get('/api/words');
    return response.data;
};
const fetchDailyWord = async () => {
    const response = await axios.get('/api/daily-word');
    return response.data;
};


const addWord = async (newWord: string) => {
    const response = await axios.post('/api/words', { word: newWord });
    return response.data;
};

const updateWord = async ({ id, word }: { id: string; word: string }) => {
    const response = await axios.put(`/api/words/${id}`, { word });
    return response.data;
};

const deleteWord = async (id: string) => {
    const response = await axios.delete(`/api/words/${id}`);
    return response.data;
};

export const useWords = () => {
    return useQuery<WithId<WordSchemaType>[]>({ queryKey: ['words'], queryFn: fetchWords });
};

export const useDailyWord = () => {
    const date = (new Date()).toISOString().split('T')[0];
    return useQuery<WithId<WordSchemaType>>({ queryKey: ['daily-word', date], queryFn: fetchDailyWord });
}

export const useAddWord = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addWord,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['words'] });
        },
    });
};

export const useUpdateWord = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateWord,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['words'] });
        },
    });
};

export const useDeleteWord = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteWord,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['words'] });
        },
    });
};