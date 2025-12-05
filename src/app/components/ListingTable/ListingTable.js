import React from "react";
import DataTable from "react-data-table-component";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <form
      className={
        "d-none d-sm-inline-block form-inline ml-auto mw-100 pull-right"
      }
    >
      <div className={"input-group"}>
        <input
          type={"text"}
          className={"form-control bg-light border-0 small"}
          placeholder={"Search"}
          aria-label={"Search"}
          value={filterText}
          onChange={onFilter}
          aria-describedby={"basic-addon2"}
        />
        <div className={"input-group-append"}>
          <button
            className={"btn btn-primary"}
            type={"button"}
            onClick={onClear}
          >
            <i className={"fas fa-times fa-sm"}></i>
          </button>
        </div>
      </div>
    </form>
  </>
);

const ListingTable = ({ data, columns, filterColumn, isLoading }) => {
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  // const filteredItems = data.filter(
  //   (item) =>
  //     item[filterColumn] && 
  //   // () 
  //     item[filterColumn].toLowerCase().includes(filterText.toLowerCase())
  // );

  const filteredItems = data.filter(item => {
  if (!filterText) return true;

  return filterColumn.some(column => {
    const value = item[column];

    // If the value is an object (like opportunity_type.name), handle it specially
    if (column === "opportunity_type" && value && value.name) {
      return value.name.toLowerCase().includes(filterText.toLowerCase());
    }

    // Convert value to string and check for inclusion
    return value &&
      value.toString().toLowerCase().includes(filterText.toLowerCase());
  });
});

  // const filteredItems = data.filter(item => {
  //   if (!filterText) return true;
    
  //   return filterColumn.some(column => {
  //     if (column === "opportunity_type") {
  //       return item.opportunity_type && 
  //         item.opportunity_type.name &&
  //         typeof item.opportunity_type.name === 'string' &&
  //         item.opportunity_type.name.toLowerCase().includes(filterText.toLowerCase());
  //     }
  //     return item[column] && 
  //       typeof item[column] === 'string' &&
  //       item[column].toLowerCase().includes(filterText.toLowerCase());
  //   });
  // });
 
  
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div className="table-responsive">
      <DataTable
        columns={columns}
        data={filteredItems}
        progressPending={isLoading}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
      />
    </div>
  );
};

export default ListingTable;
