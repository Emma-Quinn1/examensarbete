"use client";

import { CustomPagination } from "@/components/Pagination";
import useAuth from "@/hooks/useAuth";
import useGetPets from "@/hooks/useGetPets";
import { petsCol } from "@/services/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { MoonLoader } from "react-spinners";

const MyRelocations = () => {
  const { currentUser } = useAuth();
  const { data, loading } = useGetPets();
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const pageSize = 5;

  const goToPage = (pageNumber: number) => {
    try {
      router.push(`/myRelocations?page=${pageNumber}`);
    } catch {
      setGeneralError("Ett fel uppstod vid sidbyte. Försök igen senare.");
    }
  };

  const userRelocations =
    data?.filter((pet) => pet.author.email === currentUser?.email) || [];
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = userRelocations.slice(startIndex, endIndex);
  const totalPages = Math.ceil(userRelocations.length / pageSize);

  const handleDelete = async () => {
    try {
      if (!currentUser || !selectedPetId) {
        throw new Error(
          "You must be logged in to delete an ad and select you own pet"
        );
      }
      const petRef = doc(petsCol, selectedPetId);
      await deleteDoc(petRef);
      router.refresh();
      setShowModal(false);
    } catch {
      setGeneralError("Ett fel uppstod. Försök igen senare.");
      setShowModal(false);
    }
  };

  const confirmDelete = (id: string) => {
    setSelectedPetId(id);
    setShowModal(true);
  };

  useEffect(() => {
    if (!currentUser) {
      router.push("/logIn");
    }
  }, [currentUser, router]);

  return (
    <>
      <Container className="py-2 center-y mt-4 relocations-page">
        <h1 className="mt-2 mb-2 fs-1 fw-light border-bottom border-success pb-2">
          Mina omplaceringar
        </h1>

        {generalError && (
          <div
            role="alert"
            aria-live="assertive"
            className="alert alert-danger"
          >
            {generalError}
          </div>
        )}

        {loading ? (
          <div id="loader">
            <MoonLoader color={"#888"} size={25} speedMultiplier={1.1} />
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : paginatedData && paginatedData.length > 0 ? (
          <Row>
            {paginatedData.map((pet) => {
              return (
                <Col
                  md={4}
                  key={pet._id}
                  className="mb-4 d-flex align-items-stretch mt-4"
                >
                  <Card className="w-100 mt-4">
                    <Card.Img
                      variant="top"
                      src={
                        Array.isArray(pet.imageUrls) && pet.imageUrls.length > 0
                          ? pet.imageUrls[0]
                          : "/placeholder.jpg"
                      }
                      alt={pet.name}
                    />
                    <Card.Body className="card-relocation-page d-flex flex-column">
                      <Card.Title className="pets fw-light fs-3">
                        {pet.name}
                      </Card.Title>

                      <Button
                        className="mt-2 fs-6 fw-lighter"
                        variant="danger"
                        onClick={() => confirmDelete(pet._id)}
                      >
                        Radera omplacering
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <p>Du har inga omplaceringar, vad skönt!</p>
        )}
      </Container>

      {totalPages > 1 && (
        <CustomPagination
          total={totalPages}
          currentPage={currentPage}
          onPageChange={goToPage}
        />
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="mt-2 fs-4 fw-light">
            Bekräfta Radering
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-2 fs-5 fw-lighter">
          Är du säker på att du vill radera denna omplacering?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            className="mt-2 fs-6 fw-light"
          >
            Avbryt
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            className="mt-2 fs-6 fw-light"
          >
            Radera
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyRelocations;
