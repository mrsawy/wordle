import { Button } from '@/components/ui/button';
import React from 'react';
import AddNewWordDialog from '../__components/AddNewWordDialog';
import WordsList from '../__components/WordsList';

const AddNewWordPage: React.FC = () => {
    return (
        <div className='container mx-auto p-4'>

            <div className='m-auto'><AddNewWordDialog /></div>

            <WordsList />

        </div>
    );
};

export default AddNewWordPage;