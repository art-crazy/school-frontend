import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FrontendPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Frontend Development</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Learn modern frontend development with React, TypeScript, and more.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>UI/UX Design</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Master the principles of user interface and user experience design.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Responsive Design</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Create beautiful, responsive layouts that work on all devices.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FrontendPage; 