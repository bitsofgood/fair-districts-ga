import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  Flex,
  IconButton,
  useDisclosure,
  chakra,
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import NewspaperAddModal from "../components/NewspaperAddModal";
import axios from "axios";
import { useTable, useRowSelect } from "react-table";
import NewspaperEditModal from "../components/NewspaperEditModal";

const Newspaper = () => {
  const tableCols = useMemo(
    () => [
      {
        Header: "",
        accessor: "edit",
        Cell: ({ row: { original } }) => (
          <IconButton
            onClick={() => {
              console.log(original);
              setNewspaperToEdit(original);
              onEditOpen();
            }}
            icon={<EditIcon />}
            size="sm"
            variant="outline"
            colorScheme="black"
          />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Rating",
        accessor: "rating",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Website",
        accessor: "website",
      },
      {
        Header: "Instagram",
        accessor: "instagram",
      },
      {
        Header: "Twitter",
        accessor: "twitter",
      },
      {
        Header: "Counties",
        accessor: "counties",
        Cell: ({
          row: {
            values: { counties },
          },
        }) => <div>{counties.map((c) => c.name).join(", ")}</div>,
      },
    ],
    []
  );
  const [newspapers, setNewspapers] = useState([]);
  const [newspaperToEdit, setNewspaperToEdit] = useState();
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: tableCols, data: newspapers }, useRowSelect);

  useEffect(() => {
    async function fetchNewspapers() {
      const res = await axios.get("/api/newspaper");
      const data = await res.data;
      setNewspapers(data);
    }
    fetchNewspapers();
  }, []);

  return (
    <Box p={8}>
      <Flex direction="row" justifyContent="space-between">
        <Heading>Newspapers</Heading>
        <IconButton colorScheme="teal" icon={<AddIcon />} onClick={onAddOpen} />
      </Flex>
      <Table {...getTableProps()} variant="striped" size="md">
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col) => (
                <Th {...col.getHeaderProps()}>{col.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <NewspaperAddModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        newspapers={newspapers}
        setNewspapers={setNewspapers}
      />
      <NewspaperEditModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        newspaper={newspaperToEdit}
        newspapers={newspapers}
        setNewspapers={setNewspapers}
      />
    </Box>
  );
};

export default Newspaper;
