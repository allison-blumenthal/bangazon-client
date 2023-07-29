import Link from 'next/link';
import React from 'react';
import { Button } from 'react-bootstrap';

export default function ProfilePage() {
  return (
    <div>
      <h1>My Profile Page</h1>
      <Link passHref href="/products/new">
        <Button type="button" className="m-2">Add a Product</Button>
      </Link>
    </div>
  );
}
