import React, { useState, useEffect } from "react";

export default function SelectedContact({ selectedContactId }) {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContactDetails() {
      try {
        const response = await fetch(
          `https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${selectedContactId}`
        );
        const result = await response.json();
        setContact(result);
      } catch (error) {
        setError(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (selectedContactId) {
      fetchContactDetails();
    }
  }, [selectedContactId]);

  if (loading) {
    return <p>Loading contact details...</p>;
  }

  if (error) {
    return <p>Error fetching contact details: {error}</p>;
  }

  if (!contact) {
    return <p>Contact not found!</p>;
  }

  return (
    <div>
      <h2>Selected Contact</h2>
      <p>Name: {contact.name}</p>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      {/* Add more details as necessary */}
    </div>
  );
}
