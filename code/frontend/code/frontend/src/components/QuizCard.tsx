'use client';

import { useState } from 'react';
import { useUI } from '@/context/UIContext';
import "@/app/page"

// Interface pour les données d'une question
function QuizCard() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-sm mx-auto my-8">
      <h3 className="text-xl font-bold mb-4 text-center">Quiz</h3>
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="font-semibold text-lg mb-4">
          Quelle est la plus grande planète de notre système solaire ?
        </p>
        <ul className="space-y-3">
          <li>
            <label className="flex items-center space-x-2">
              <input type="radio" name="quiz" className="form-radio text-blue-600" />
              <span className="text-gray-700">La Terre</span>
            </label>
          </li>
          <li>
            <label className="flex items-center space-x-2">
              <input type="radio" name="quiz" className="form-radio text-blue-600" />
              <span className="text-gray-700">Mars</span>
            </label>
          </li>
          <li>
            <label className="flex items-center space-x-2">
              <input type="radio" name="quiz" className="form-radio text-blue-600" />
              <span className="text-gray-700">Jupiter</span>
            </label>
          </li>
          <li>
            <label className="flex items-center space-x-2">
              <input type="radio" name="quiz" className="form-radio text-blue-600" />
              <span className="text-gray-700">Saturne</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default QuizCard;